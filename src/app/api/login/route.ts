// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error('JWT_SECRET not set');

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: '1h',
  });

  // Create the response first
  const response = new NextResponse(JSON.stringify({ message: 'Login successful' }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' },
});

  // Then set the cookie on the response
  response.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
