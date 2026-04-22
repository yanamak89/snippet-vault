import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Snippet Vault',
  description: 'Mini service for saving useful snippets',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (

    <html lang="en" data-theme="winter">
      <body className="min-h-screen bg-base-200 text-base-content">
        <header className="navbar border-b border-base-300 bg-base-100 shadow-sm">
          <div className="mx-auto w-full max-w-5xl px-4">
            <div className="flex-1">
              <Link href="/" className="text-xl font-bold">
                Snippet Vault
              </Link>
            </div>
            <div className="text-sm opacity-70">Save links, notes and commands</div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}