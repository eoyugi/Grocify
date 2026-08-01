import { listGroceryItems, createGroceryItem } from '@/lib/server/db-actions';

export async function GET() {
  console.log('[API] GET /api/items called');
  try {
    const items = await listGroceryItems();
    console.log(`[API] Returning ${items.length} items`);
    return Response.json({ items });
  } catch (error) {
    console.error('[API] GET /api/items CRASHED:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch items';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log('[API] POST /api/items called');
  try {
    const body = await request.json();
    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json(
        { error: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    const item = await createGroceryItem({ name, category, quantity, priority });
    console.log('[API] Created item:', item.id);
    return Response.json({ item }, { status: 201 });
  } catch (error) {
    console.error('[API] POST /api/items CRASHED:', error);
    const message = error instanceof Error ? error.message : 'Failed to create item';
    return Response.json({ error: message }, { status: 500 });
  }
}