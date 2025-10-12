import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export async function GET(request: Request) {
  try {
    // Get token from cookie or Authorization header
    const authHeader = request.headers.get('authorization');
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const match = cookieHeader.match(/auth_token=([^;]+)/);
        if (match) token = match[1];
      }
    }
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    let payload;
    try {
      payload = jwt.verify(token, SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    // Ensure payload is an object and has id
    const userId = typeof payload === 'object' && payload !== null && 'id' in payload ? (payload as any).id : null;
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, isSuperuser: true }
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Return role as 'superuser' for dashboard check
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.isSuperuser ? 'superuser' : 'user',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
