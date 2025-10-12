import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { permissionIds } = await request.json(); // array of permission IDs
    if (!Array.isArray(permissionIds)) {
      return NextResponse.json({ error: 'permissionIds must be an array' }, { status: 400 });
    }
    // Remove existing assignments
    await prisma.rolePermission.deleteMany({ where: { roleId: params.id } });
    // Assign new permissions
    const created = await Promise.all(permissionIds.map(pid =>
      prisma.rolePermission.create({ data: { roleId: params.id, permissionId: pid } })
    ));
    return NextResponse.json({ success: true, count: created.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { permissionIds } = await request.json(); // array of permission IDs
    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
      return NextResponse.json({ error: 'No permission IDs provided' }, { status: 400 });
    }
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: params.id,
        permissionId: { in: permissionIds },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
