import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        inventoryItem: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    // Optionally, you can shape the response to only include relevant category fields
    const productsWithCategory = products.map(product => ({
      ...product,
      category: product.category ? {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      } : null,
    }));
    return NextResponse.json(productsWithCategory);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Only map required fields for product creation
    const {
      name,
      description,
      price,
      sku,
      categoryId,
      isActive
    } = data;
    // Use the actual superuser ID for now
    const superuserEmail = "admin@imanicoffee.com";
    const superuser = await prisma.user.findUnique({ where: { email: superuserEmail } });
    if (!superuser) {
      return NextResponse.json({ error: "Superuser not found" }, { status: 500 });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        isActive,
        category: { connect: { id: categoryId } },
        createdBy: { connect: { id: superuser.id } },
        updatedBy: { connect: { id: superuser.id } },
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
