import { ReactNode } from "react";

interface CardProps {
  device: "pc" | "mo";
  title: string;
  category: string;
  date: string;
  author?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  device,
  title,
  category,
  date,
  author,
  onClick,
  className = "",
}: CardProps) {
  // global.css의 .card-pc 또는 .card-mo와 연결
  const sizeClass = `card-${device}`;

  return (
    <div 
      className={`card-list ${sizeClass} ${className}`} 
      onClick={onClick}
    >
      {/* [1단] 제목 */}
      <div className="card-row">
        <div className="card-title">{title}</div>
      </div>

      {/* [2단] 좌측 카테고리 / 우측 정보(작성자+날짜) */}
      <div className="card-row">
        <span className="card-sub">{category}</span>
        
        <div className="card-sub flex gap-[10px]">
          {author && (
            <>
              <span>{author}</span>
              <span className="text-gray-300">|</span>
            </>
          )}
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}