import type { Metadata } from 'next';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'ระบบบริหารจัดการงานและโครงการ',
  description: 'เว็บแอปพลิเคชันจัดการโครงการและงาน ด้วย Next.js'
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
