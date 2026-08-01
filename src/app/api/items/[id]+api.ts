import {
  deleteGroceryItem,
  setGroceryItemPurchased,
  updateGroceryItemQuantity,
} from '@/lib/server/db-actions';

function getItemId(request: Request, context?: { params?: { id?: string } }) {
  const contextId = context?.params?.id;
  if (contextId) {
    return contextId;
  }

  const pathname = new URL(request.url).pathname;
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] ?? '';
}

export async function PATCH(request: Request, context?: { params?: { id?: string } }) {
  try {
    const id = getItemId(request, context);
    if (!id) {
      return Response.json({ error: 'Missing item ID.' }, { status: 400 });
    }

    const body = await request.json();

    const item = 'quantity' in body
      ? await updateGroceryItemQuantity(id, body.quantity)
      : await setGroceryItemPurchased(id, body.purchased ?? true);

    if (!item) {
      return Response.json({ error: 'Item not found.' }, { status: 404 });
    }

    return Response.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update item';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context?: { params?: { id?: string } }) {
  try {
    const id = getItemId(request, context);
    if (!id) {
      return Response.json({ error: 'Missing item ID.' }, { status: 400 });
    }

    await deleteGroceryItem(id);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete item';
    return Response.json({ error: message }, { status: 500 });
  }
}