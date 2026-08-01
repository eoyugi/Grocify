const https = require("https");
const { neon, neonConfig } = require("@neondatabase/serverless");

const NEON_API_IPS = ["3.227.144.24", "54.92.227.85", "3.215.191.145"];

function neonFetch(input, init) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const parsedUrl = new URL(url);
  if (!parsedUrl.hostname.endsWith(".neon.tech")) return fetch(input, init);

  const servername = parsedUrl.hostname;
  const path = parsedUrl.pathname + parsedUrl.search;
  const method = (init && init.method) || "GET";
  const body = init && init.body;
  const headers = {};

  if (init && init.headers) {
    if (typeof init.headers.forEach === "function") {
      init.headers.forEach((v, k) => { headers[k] = v; });
    } else if (Array.isArray(init.headers)) {
      init.headers.forEach(([k, v]) => { headers[k] = v; });
    } else {
      Object.assign(headers, init.headers);
    }
  }

  const tryIp = (index) => {
    if (index >= NEON_API_IPS.length) return fetch(input, init);
    const ip = NEON_API_IPS[index];
    return new Promise((resolve, reject) => {
      const reqHeaders = body
        ? { ...headers, "Content-Length": String(Buffer.byteLength(body)) }
        : { ...headers };
      const req = https.request(
        { host: ip, port: 443, path, method, servername, headers: reqHeaders, timeout: 10000 },
        (res) => {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => {
            const bodyText = Buffer.concat(chunks).toString("utf8");
            resolve(new Response(bodyText, { status: res.statusCode || 200, headers: res.headers }));
          });
          res.on("error", () => tryIp(index + 1).then(resolve, reject));
        }
      );
      req.on("timeout", () => { req.destroy(); tryIp(index + 1).then(resolve, reject); });
      req.on("error", () => tryIp(index + 1).then(resolve, reject));
      if (body) req.write(body);
      req.end();
    });
  };

  return tryIp(0);
}

neonConfig.fetchFunction = neonFetch;

const dbUrl = "postgresql://neondb_owner:npg_rPnVKBqQl7H4@ep-weathered-breeze-au3srlpe.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(dbUrl);

sql.query("SELECT id, name FROM grocery_items ORDER BY updated_at DESC LIMIT 5", [], { fullResults: true })
  .then((result) => { console.log("SUCCESS!"); console.log("rowCount:", result.rowCount); console.log("rows:", JSON.stringify(result.rows, null, 2)); })
  .catch((err) => { console.error("FAILED:", err.message); });
