import { NextResponse } from 'next/server';

export async function POST() {
   const response = new NextResponse(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  // Effectively delete the cookie by setting it with maxAge 0
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
