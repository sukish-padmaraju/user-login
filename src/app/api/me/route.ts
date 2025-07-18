import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error('JWT_SECRET not set');

export async function GET() {
  const cookieStore = await cookies();  // await here
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const data = jwt.verify(token, SECRET);
    return NextResponse.json({ user: data });
  } catch (err) {
    return NextResponse.json({ user: null, error: 'Invalid or expired token' }, { status: 401 });
  }
}
