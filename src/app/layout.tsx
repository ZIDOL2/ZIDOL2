import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '영수증 관리',
  description: 'PDF 이미지 둘다 지원하는 영수증 관리 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지 공통 네비게이션 */}
        <nav className="nav">
          <Link href="/">📄 영수증 등록</Link>
          <Link href="/list">📋 영수증 목록</Link>
        </nav>
        {/* 각 페이지 컴포넌트가 여기에 렌더링 */}
        {children}
      </body>
    </html>
  );
}
