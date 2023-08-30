import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import '../globals.css';
import { Bottombar, LeftSidebar, Navbar, RightSidebar } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Clone de Meta thread con Next 13'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {/* Navbar */}
          <Navbar />
          <main className="flex flex-row">
            {/* leftSidebar */}
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
            {/* RightSidebar */}
          </main>
          <Bottombar />
          {/* Bottonbar */}
        </body>
      </html>
    </ClerkProvider>
  );
}
