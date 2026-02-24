'use client';

import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add'; // MUI 아이콘 사용 시

interface DiscographyCardProps {
  title: string;
  date: string;
  src: string;
  onClick?: () => void;
}

export default function DiscographyCard({ title, date, src, onClick }: DiscographyCardProps) {
  return (
    <div 
      className="group cursor-pointer w-full" 
      onClick={onClick}
    >
      {/* 1. 이미지 영역 (정사각형, Radius 12px) */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-gray-100">
        <Image 
          src={src} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 호버 오버레이: 평소엔 투명(opacity-0)하다가 호버 시 나타남 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          {/* + 아이콘: 부모(이미지) 크기의 70% */}
          <AddIcon 
            className="text-white opacity-80" 
            style={{ fontSize: '70%' }} // 부모의 70% 크기
            sx={{ width: '70%', height: '70%' }} 
          />
        </div>
      </div>

      {/* 2. 텍스트 영역 */}
      <div className="mt-[10px] lg:mt-[20px] flex flex-col w-full gap-[5px] lg:gap-[10px]">
        {/* 1단: 좌측 타이틀 */}
        <div className="flex justify-start">
          <span className="text-h4 font-bold text-black truncate">{title}</span>
        </div>
        
        {/* 2단: 우측 일자 */}
        <div className="flex justify-end">
          <span className="text-h4 text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );
}