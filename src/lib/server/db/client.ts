import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as https from "https";
import * as schema from "./schema";

/**
 * Custom fetch function for the Neon HTTP driver.
 *
 * Problem: DNS resolution for `api.c-10.us-east-1.aws.neon.tech` is flaky on
 * this network -- it sometimes returns IPs that do not respond on port 443,
 * causing ETIMEDOUT on the TLS handshake before any SQL is sent.
 *
 * The three IPs that reliably respond are pre-resolved here. The correct SNI
 * hostname is passed via `servername` so the TLS certificate is validated
 * against `*.c-10.us-east-1.aws.neon.tech`, matching what the server presents.
 *
 * If none of the pre-resolved IPs succeed we fall back to native `fetch` so
 * the driver still works in environments where DNS is healthy.
 */
const NEON_API_IPS = ["3.227.144.24", "54.92.227.85", "3.215.191.145"] as const;

function neonFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url =
    typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const parsedUrl = new URL(url);

  // Only apply the workaround to requests going to *.neon.tech.
  if (!parsedUrl.hostname.endsWith(".neon.tech")) {
    return fetch(input, init);
  }

  const servername = parsedUrl.hostname;
  const path = parsedUrl.pathname + parsedUrl.search;
  const method = (init?.method as string | undefined) ?? "GET";
  const body = init?.body as string | undefined;
  const headers: Record<string, string> = {};

  // Copy request headers.
  if (init?.headers) {
    if (init.headers instanceof Headers) {
      init.headers.forEach((v, k) => {
        headers[k] = v;
      });
    } else if (Array.isArray(init.headers)) {
      (init.headers as [string, string][]).forEach(([k, v]) => {
        headers[k] = v;
      });
    } else {
      Object.assign(headers, init.headers as Record<string, string>);
    }
  }

  // Try each known-good IP in sequence.
  const tryIp = (index: number): Promise<Response> => {
    if (index >= NEON_API_IPS.length) {
      // All pre-resolved IPs exhausted -- fall back to native fetch.
      return fetch(input, init);
    }

    const ip = NEON_API_IPS[index];

    return new Promise<Response>((resolve, reject) => {
      const reqHeaders = body
        ? { ...headers, "Content-Length": String(Buffer.byteLength(body)) }
        : { ...headers };

      const reqOptions: https.RequestOptions = {
        host: ip,
        port: 443,
        path,
        method,
        servername,
        headers: reqHeaders,
        timeout: 10_000,
      };

      const req = https.request(reqOptions, (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const bodyText = Buffer.concat(chunks).toString("utf8");
          resolve(
            new Response(bodyText, {
              status: res.statusCode ?? 200,
              headers: res.headers as Record<string, string>,
            })
          );
        });
        res.on("error", () => tryIp(index + 1).then(resolve, reject));
      });

      req.on("timeout", () => {
        req.destroy();
        tryIp(index + 1).then(resolve, reject);
      });

      req.on("error", () => tryIp(index + 1).then(resolve, reject));

      if (body) req.write(body);
      req.end();
    });
  };

  return tryIp(0);
}

// Inject custom fetch so the Neon driver bypasses flaky DNS resolution.
neonConfig.fetchFunction = neonFetch;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for API routes.");
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
