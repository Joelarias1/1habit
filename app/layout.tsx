import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '1habit - Transform Your Life Through Better Habits',
  description: 'Build lasting habits that stick with our science-backed approach. Track, analyze, and improve your daily routines effortlessly.',
  icons: {
    icon: [
      {
        url: '/assets/img/logo-1habit.png',
        href: '/assets/img/logo-1habit.png',
      }
    ],
    apple: [
      {
        url: '/assets/img/logo-1habit.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}