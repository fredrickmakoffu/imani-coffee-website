import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Get categories from the database
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { sortOrder: 'asc' }
  });
  return NextResponse.json(categories);
}