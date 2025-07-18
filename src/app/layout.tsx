// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Next Auth App',
  description: 'Login flow in Next.js App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
