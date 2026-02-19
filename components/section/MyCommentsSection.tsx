'use client';

import { useState } from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Card from '@/components/common/Card'; 
import { CATEGORY_OPTIONS, getCategoryLabel } from '@/data/constants';

interface MyCommentsSectionProps {
  device: "pc" | "mo";
}

export default function MyCommentsSection({ device }: MyCommentsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  // --- [PC 버전] ---
  if (device === "pc") {
    return (
      <div className="flex flex-col w-full">
        {/* 검색 영역 */}
        <div className="flex flex-row gap-[10px] mb-[40px]">
          <Select 
            device={device}
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[160px]"
          />
          <Input 
            device={device}
            isSearch={true}
            placeholder="제목을 입력해 주세요"
            className="flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 댓글 리스트 (PC) */}
        <div className="flex flex-col gap-[20px] mb-[40px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card
              key={i}
              device={device}
              category={getCategoryLabel(category)} 
              title="내가 작성한 댓글 내용입니다."
              date="2026.01.20"
              author="원글작성자" 
              onClick={() => console.log('원문 이동')}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10 mb-[100px]">
          <MuiPagination count={5} page={currentPage} onChange={handlePageChange} size="large" />
        </div>
      </div>
    );
  }

  // --- [모바일 버전] ---
  if (device === "mo") {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-[10px] mb-[30px]">
          <Select 
            device={device}
            options={CATEGORY_OPTIONS} 
            value={category} onChange={(e) => setCategory(e.target.value)} 
          />
          <Input 
            device={device} 
            isSearch={true} 
            placeholder="제목을 입력해 주세요" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="flex flex-col gap-[20px] mb-[40px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              device={device}
              category={getCategoryLabel(category)} 
              title="모바일 댓글 내용입니다."
              date="2026.01.20"
              author="작성자" 
            />
          ))}
        </div>

        <div className="flex justify-center mt-[20px] mb-[60px]">
          <MuiPagination count={5} page={currentPage} onChange={handlePageChange} size="medium" />
        </div>
      </div>
    );
  }

  return null;
}