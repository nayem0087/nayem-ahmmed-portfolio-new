import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nayem Ahmmed | Frontend Developer',
  description:
    'Frontend Developer passionate about creating beautiful, interactive, and high-performance web experiences.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Portfolio', 'Nayem Ahmmed'],
  authors: [{ name: 'Nayem Ahmmed' }],
  icons: {
    icon: '/nayem.jpg',
    shortcut: '/nayem.jpg',
    apple: '/nayem.jpg',
  },
  openGraph: {
    title: 'Nayem Ahmmed | Frontend Developer',
    description:
      'Frontend Developer passionate about creating beautiful, interactive, and high-performance web experiences.',
    type: 'website',
    images: [{ url: '/nayem.JPG' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
