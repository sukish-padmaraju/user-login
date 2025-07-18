// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user: any = null;

  try {
    if (!token) throw new Error('No token');
    user = jwt.verify(token, SECRET);
  } catch (e) {
    return <div className="p-8 text-red-500">Unauthorized. Please log in.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Welcome, {user.email}!</h1>
      <form method="POST" action="/api/logout">
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </form>
    </div>
  );
}
