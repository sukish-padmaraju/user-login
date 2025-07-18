import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function Dashboard() {
  const token = cookies().get('token')?.value;
  let user = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
  } catch { }

  if (!user) {
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