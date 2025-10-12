export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Role name is required' }, { status: 400 });
    }
    const role = await prisma.role.create({
      data: {
        name,
        description,
        isActive: true,
      },
      select: { id: true, name: true, description: true },
    });
    return NextResponse.json(role);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      where: { isActive: true },
      select: { id: true, name: true, description: true },
    });
    return NextResponse.json(roles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
