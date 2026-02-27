'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { Pagination as MuiPagination } from '@mui/material';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Card from '@/components/common/Card'; 
import { Community_category, getCommunity_category } from '@/data/category';
import Button from '@/components/common/Button';
import { useDevice } from '@/hooks/useDevice';
import { useAuth } from "@/context/AuthContext";

const COMMUNITY_LIST = Array.from({ length: 25 }).map((_, i) => {
    const realCategories = Community_category.filter(cat => cat.value !== 'all');
    const categoryValue = realCategories[i % realCategories.length].value;
  
    return {
      id: String(i + 1),
      category: categoryValue,
      title: `${getCommunity_category(categoryValue)} 커뮤니티 ${i + 1}`,
      date: '2026.01.20',
      author: '작성자',
    };
  });

export default function Community() {
  const device = useDevice();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
 
  const isLoggedIn = !!user;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null;
  if (!device) return null;

  const filteredData = COMMUNITY_LIST.filter(item => {
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

  const handleDetailNav = (id: string) => {
    router.push(`/community/${id}`);
  };

  const handleWriteNav = () => {
    router.push('/community/write');
  };

  /* =========================
      PC 버전
  ========================= */
  if (device === 'pc') {
    return (
      <SideLayout num="07" title="Community">  
        <div className="flex w-full gap-[80px] items-start">
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-[40px]">
              <Select 
                device={device}
                label="구분"
                options={Community_category}
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
                
                {/* 검색 버튼 우측: 로그인 시 글쓰기 버튼 노출 */}
                {isLoggedIn && (
                  <Button variant="black" size="md" className="w-[100px]" onClick={handleWriteNav}>
                    글쓰기
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              {visibleItems.map((item) => (
                <Card
                  key={item.id}
                  device={device}
                  category={getCommunity_category(item.category)}
                  title={item.title}
                  date={item.date}
                  author={item.author}
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
                options={Community_category} 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <div className="flex gap-[10px] items-center">
                <Input 
                  device="mo"
                  isSearch={true} 
                  placeholder="제목을 입력해 주세요" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                {/* 모바일에서도 검색/글쓰기 로직이 필요할 경우 여기에 추가 가능 */}
                {isLoggedIn && (
                  <Button variant="black" size="sm" className="w-[80px]" onClick={handleWriteNav}>
                    글쓰기
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              {visibleItems.map((item) => (
                <Card
                  key={item.id}
                  device={device}
                  category={getCommunity_category(item.category)} 
                  title={item.title}
                  date={item.date}
                  author={item.author}                                    
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