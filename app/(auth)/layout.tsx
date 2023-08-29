import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Clone de Meta thread con Next 13'
};

interface Props {
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="es">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
