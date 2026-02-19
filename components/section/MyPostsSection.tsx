'use client';

import { useState } from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Card from '@/components/common/Card'; 
import { CATEGORY_OPTIONS, getCategoryLabel } from '@/data/constants';

interface MyPostsSectionProps {
  device: "pc" | "mo";
}

export default function MyPostsSection({ device }: MyPostsSectionProps) {
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

        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[40px] mb-[60px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card
              key={i}
              device={device}
              category={getCategoryLabel(category)} 
              title="내가 작성한 게시글의 제목이 노출되는 영역입니다."
              date="2026.01.20"
              onClick={() => console.log('글 클릭')}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10 mb-[100px]">
          <MuiPagination 
            count={10} 
            page={currentPage} 
            onChange={handlePageChange} 
            size="large" 
          />
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input 
            device={device}
            isSearch={true}
            placeholder="제목 검색"
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
              title="모바일에서 작성된 제목 영역입니다."
              date="2026.01.20"
            />
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-[60px]">
          <MuiPagination 
            count={10} 
            page={currentPage} 
            onChange={handlePageChange} 
            size="medium" 
          />
        </div>
      </div>
    );
  }

  return null;
}