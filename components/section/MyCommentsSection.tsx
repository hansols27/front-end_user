'use client';

import { useState } from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Card from '@/components/common/Card'; 
import { CATEGORY_OPTIONS, getCategoryLabel } from '@/data/constants';
import Button from '@/components/common/Button';
import { useDevice } from '@/hooks/useDevice';

/* =========================
   전체 데이터 수 (공통)
========================= */
const TOTAL_ITEMS = 20;

export default function MyCommentsSection() {
  const device = useDevice();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  if (!device) return null;

 /* =========================
     디바이스별 페이지당 개수
  ========================= */
  const ITEMS_PER_PAGE = device === 'pc' ? 10 : 5;
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  /* =========================
     페이지 변경 + 스크롤
  ========================= */
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* =========================
     페이지별 데이터 계산
  ========================= */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleItems = Array.from({ length: TOTAL_ITEMS }).slice(
    startIndex,
    endIndex
  );

  // --- [PC 버전] ---
  if (device === "pc") {
    return (
      <div className="flex flex-col w-full">
        {/* 검색 영역 */}
        <div className="flex items-center mb-[40px]">
          {/* 좌측: Select */}
          <Select 
            device={device}
            label="구분"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-[160px]"
          />

          {/* 우측: Input + Button */}
          <div className="flex items-center gap-[10px] ml-auto">
            <Input 
              device={device}
              isSearch={true}
              placeholder="제목을 입력해 주세요"
              className="w-[360px]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            <Button 
              variant="black" 
              size="md" 
              className="w-[100px]"
            >
            검색
            </Button>
          </div>
        </div>

        {/* 댓글 리스트 (PC) */}
        <div className="flex flex-col gap-[20px] mb-[40px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card
              key={i}
              device={device}
              category={getCategoryLabel(category)} 
              title={`내가 작성한 게시글 ${startIndex + i + 1}`}
              date="2026.01.20"
              author="원글작성자" 
              onClick={() => console.log('원문 이동')}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-10 mb-[100px]">
          <MuiPagination
            count={TOTAL_PAGES}
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
            device="pc"
            label="구분"
            options={CATEGORY_OPTIONS} 
            value={category} 
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Input 
            device="pc"
            isSearch={true} 
            placeholder="제목을 입력해 주세요" 
            value={searchTerm} 
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }} 
          />
        </div>

        <div className="flex flex-col gap-[20px] mb-[40px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              device={device}
              category={getCategoryLabel(category)} 
              title={`모바일 게시글 ${startIndex + i + 1}`}
              date="2026.01.20"
              author="작성자" 
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-10 mb-[100px]">
          <MuiPagination
            count={TOTAL_PAGES}
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