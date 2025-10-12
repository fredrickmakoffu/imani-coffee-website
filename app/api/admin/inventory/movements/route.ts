import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List all inventory movements (transactions)
export async function GET() {
  try {
    const movements = await prisma.inventoryTransaction.findMany({
      include: {
        inventoryItem: {
          include: { product: true }
        },
        createdBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(movements);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
