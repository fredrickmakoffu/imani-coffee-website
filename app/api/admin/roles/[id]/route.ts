export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.role.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, description, isActive } = await request.json();
    const role = await prisma.role.update({
      where: { id: params.id },
      data: {
        name,
        description,
        isActive,
      },
      select: { id: true, name: true, description: true, isActive: true },
    });
    return NextResponse.json(role);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
