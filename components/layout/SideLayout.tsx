import { ReactNode } from 'react';

interface SideLayoutProps {
  children: ReactNode;
  num: string;      // "01", "02" 등 페이지 번호
  title: string;    // "PROFILE", "NOTICE" 등 페이지 제목
  className?: string; // 추가적인 커스텀 스타일이 필요할 경우
}

export default function SideLayout({ children, num, title, className = '' }: SideLayoutProps) {
  return (
    <main className={`sub-page-layout layout-side ${className}`}>
      <aside className="title-type-side">
        <span className="num">{num}</span>
        <div className="line" />
        <div className="text">{title}</div>
      </aside>
      <section className="sub-content">
        {children}
      </section>
    </main>
  );
}