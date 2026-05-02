import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Salman Shah | Frontend Developer',
  description:
    'Frontend Developer passionate about creating beautiful, interactive, and high-performance web experiences.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Portfolio', 'Salman Shah'],
  authors: [{ name: 'Salman Shah' }],
  icons: {
    icon: '/profile.png',
    shortcut: '/profile.png',
    apple: '/profile.png',
  },
  openGraph: {
    title: 'Salman Shah | Frontend Developer',
    description:
      'Frontend Developer passionate about creating beautiful, interactive, and high-performance web experiences.',
    type: 'website',
    images: [{ url: '/profile.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
