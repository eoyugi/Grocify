import { clearPurchasedItems } from '@/lib/server/db-actions';

export async function POST() {   // change from DELETE to POST
  try {
    await clearPurchasedItems();
    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to clear purchased items';
    return Response.json({ error: message }, { status: 500 });
  }
}