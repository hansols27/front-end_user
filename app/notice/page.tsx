'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { Pagination as MuiPagination } from '@mui/material';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Card from '@/components/common/Card'; 
import { Notice_category, getNotice_category } from '@/data/category';
import Button from '@/components/common/Button';
import { useDevice } from '@/hooks/useDevice';

// 1. 실제 데이터 구조 생성 (id 포함)
const NOTICE_LIST = Array.from({ length: 25 }).map((_, i) => {
  // 전체(all)를 제외한 실제 카테고리들 중 하나를 할당 (Index 1부터 사용)
  const realCategories = Notice_category.filter(cat => cat.value !== 'all');
  const categoryValue = realCategories[i % realCategories.length].value;

  return {
    id: String(i + 1),
    category: categoryValue,
    title: `${getNotice_category(categoryValue)} 소식입니다 ${i + 1}`,
    date: '2026.01.20',
  };
});

export default function Notice() {
  const device = useDevice();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  if (!device) return null;

  /* =========================
      데이터 필터링 및 계산
  ========================= */
  // 카테고리와 검색어에 따른 필터링 로직 추가
  const filteredData = NOTICE_LIST.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ITEMS_PER_PAGE = device === 'pc' ? 10 : 5;
  const TOTAL_PAGES = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* =========================
      상세 이동 핸들러
  ========================= */
  const handleDetailNav = (id: string) => {
    router.push(`/notice/${id}`);
  };

  /* =========================
      PC 버전
  ========================= */
  if (device === 'pc') {
    return (
      <SideLayout num="06" title="Notice">  
        <div className="flex w-full gap-[80px] items-start">
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-[40px]">
              <Select 
                device={device}
                label="구분"
                options={Notice_category}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-[160px]"
              />

              <div className="flex items-center gap-[10px] ml-auto">
                <Input 
                  device={device}
                  isSearch={true}
                  placeholder="제목을 입력해 주세요"
                  className="w-[360px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setCurrentPage(1)}
                />
                <Button variant="black" size="md" className="w-[100px]" onClick={() => setCurrentPage(1)}>
                  검색
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              {visibleItems.map((item) => (
                <Card
                  key={item.id}
                  device={device}
                  category={getNotice_category(item.category)}
                  title={item.title}
                  date={item.date}
                  onClick={() => handleDetailNav(item.id)} 
                />
              ))}
              {visibleItems.length === 0 && (
                <div className="py-20 text-center text-gray-sub">검색 결과가 없습니다.</div>
              )}
            </div>

            <div className="flex justify-center mt-[40px]">
              <MuiPagination count={TOTAL_PAGES} page={currentPage} onChange={handlePageChange} size="large" />
            </div>
          </div>
        </div>                
      </SideLayout>        
    );
  }

  /* =========================
      모바일 버전
  ========================= */
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">
          <div className="flex flex-col w-full px-5">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <Select 
                device="mo"
                label="구분"
                options={Notice_category} 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Input 
                device="mo"
                isSearch={true} 
                placeholder="제목을 입력해 주세요" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>

            <div className="flex flex-col gap-[20px]">
              {visibleItems.map((item) => (
                <Card
                  key={item.id}
                  device={device}
                  category={getNotice_category(item.category)} 
                  title={item.title}
                  date={item.date}                         
                  onClick={() => handleDetailNav(item.id)} 
                />
              ))}
            </div>

            <div className="flex justify-center mt-[20px]">
              <MuiPagination count={TOTAL_PAGES} page={currentPage} onChange={handlePageChange} size="medium" />
            </div>
          </div>          
        </div>
      </main>
    );
  }

  return null;
}