import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Study Plan',
  description: 'Study Plan for Full Stack Developer',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Study Plan',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon/favicon-32x32.png',
    apple: '/icon/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="w-full min-h-full ">
        <div className="flex sticky top-0 z-50 w-full bg-slate-300 h-16">
          <div className="flex justify-between items-center w-full max-w-6xl  mx-auto overflow-x-auto">
            <Navbar />
          </div>
        </div>
        <main className="w-full max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
