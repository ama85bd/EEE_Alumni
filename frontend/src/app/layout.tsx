import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import BaseLayout from '@/components/layouts/base-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EEE IU Alumni',
  description: 'EEE IU Alumni',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='container mx-auto max-w-full bg-stone-100'>
          <BaseLayout>{children}</BaseLayout>
        </div>
      </body>
    </html>
  );
}
