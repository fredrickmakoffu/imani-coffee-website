import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      select: { id: true, name: true, description: true, module: true, action: true },
    });
    return NextResponse.json(permissions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, module, action } = await request.json();
    if (!name || !module || !action) {
      return NextResponse.json({ error: 'Name, module, and action are required' }, { status: 400 });
    }
    const permission = await prisma.permission.create({
      data: { name, description, module, action },
      select: { id: true, name: true, description: true, module: true, action: true },
    });
    return NextResponse.json(permission);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
