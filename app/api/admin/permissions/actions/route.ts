import { NextResponse } from 'next/server';
import { permissionActionsList } from '../actions';

export async function GET() {
  return NextResponse.json(permissionActionsList);
}
