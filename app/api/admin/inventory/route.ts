import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List inventory for all products
export async function GET() {
  try {
    const inventory = await prisma.inventoryItem.findMany({
      include: {
        product: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(inventory);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add or remove stock for a product
export async function POST(request: Request) {
  try {
    const { productId, quantityChange } = await request.json();
    if (!productId || typeof quantityChange !== 'number') {
      return NextResponse.json({ error: 'Missing productId or quantityChange' }, { status: 400 });
    }

    // Get user from Authorization header
    let createdById = undefined;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      try {
        // @ts-ignore
        const { id } = await (await import('@/lib/auth')).verifyToken(token);
        if (id) createdById = id;
      } catch (err) {}
    }
    // Find or create inventory item for product
    let inventoryItem = await prisma.inventoryItem.findUnique({ where: { productId } });
    let previousQuantity = inventoryItem ? inventoryItem.quantity : 0;
    let newQuantity;
    if (!inventoryItem) {
      newQuantity = Math.max(0, quantityChange);
      inventoryItem = await prisma.inventoryItem.create({
        data: {
          productId,
          quantity: newQuantity,
        },
      });
    } else {
      // Update quantity (add or remove stock)
      newQuantity = Math.max(0, inventoryItem.quantity + quantityChange);
      inventoryItem = await prisma.inventoryItem.update({
        where: { productId },
        data: { quantity: newQuantity },
      });
    }

    // Log inventory transaction
    await prisma.inventoryTransaction.create({
      data: {
        inventoryItemId: inventoryItem.id,
        type: quantityChange > 0 ? 'STOCK_IN' : 'STOCK_OUT',
        quantity: quantityChange,
        previousQuantity,
        newQuantity,
        reason: quantityChange > 0 ? 'Stock added' : 'Stock removed',
        createdById,
      },
    });

    return NextResponse.json(inventoryItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
