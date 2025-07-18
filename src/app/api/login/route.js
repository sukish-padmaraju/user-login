import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req) {
  const { email, password } = await req.json();

  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

  cookies().set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 3600,
  });

  return NextResponse.json({ message: 'Login successful' });
}