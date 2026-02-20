import { ReactNode } from 'react';

interface SideLayoutProps {
  children: ReactNode;
  num: string;
  title: string;
  className?: string;
}

export default function SideLayout({
  children,
  num,
  title,
  className = '',
}: SideLayoutProps) {
  return (
    <main className={`sub-page-layout layout-side ${className}`}>
      <div className="pc-content">
        {/* 좌측 고정 여백 (140px) */}
        <div />

        {/* 중앙 컨텐츠 영역 */}
        <section>
          {children}
        </section>

        {/* 우측 고정 Side Layout (140px) */}
        <aside className="title-type-side">
          <span className="num">{num}</span>
          <div className="line" />
          <div className="text">{title}</div>
        </aside>
      </div>
    </main>
  );
}