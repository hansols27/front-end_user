'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import { Pagination as MuiPagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 임시 전체 데이터 (백엔드 연동 시 API로 대체)
const TOTAL_ITEMS_COUNT = 120; 
const ALL_IMAGES = Array.from({ length: TOTAL_ITEMS_COUNT }).map((_, i) => ({
  id: i + 1,
  src: `/images/gallery/photo_${(i % 10) + 1}.png`, // 이미지 경로 예시
}));

export default function GalleryPage() {
  const device = useDevice();
  const router = useRouter();
  
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null); // 모달용
  const [mobileItems, setMobileItems] = useState(ALL_IMAGES.slice(0, 30)); // 모바일 무한스크롤 데이터
  const observerTarget = useRef<HTMLDivElement>(null); // 무한스크롤 감지용

  const ITEMS_PER_PAGE_PC = 30; // 6 * 5
  const TOTAL_PAGES_PC = Math.ceil(TOTAL_ITEMS_COUNT / ITEMS_PER_PAGE_PC);

  // -------------------------------
  // 모바일 무한 스크롤 로직
  // -------------------------------
  const loadMoreItems = useCallback(() => {
    setMobileItems((prev) => {
      const nextItems = ALL_IMAGES.slice(prev.length, prev.length + 30);
      return [...prev, ...nextItems];
    });
  }, []);

  useEffect(() => {
    if (device !== 'mo' || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && mobileItems.length < TOTAL_ITEMS_COUNT) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [device, mobileItems.length, loadMoreItems]);
  

  if (!device) return null;

  // PC 페이지네이션 핸들러
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------
  // 이미지 모달 컴포넌트
  // -------------------------------
  const ImageModal = () => (
    selectedImg && (
      <div 
        className="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-[20px]"
        onClick={() => setSelectedImg(null)}
      >
        <button className="absolute top-[40px] right-[40px] text-white">
          <CloseIcon sx={{ fontSize: 40 }} />
        </button>
        <div className="relative max-w-[90%] max-h-[90%]">
          <img src={selectedImg} alt="Detail" className="object-contain max-h-[85vh]" />
        </div>
      </div>
    )
  );

  // =========================
  // PC 버전 (6 * 5 그리드)
  // =========================
  if (device === 'pc') {
    const pcVisibleItems = ALL_IMAGES.slice(
      (currentPage - 1) * ITEMS_PER_PAGE_PC,
      currentPage * ITEMS_PER_PAGE_PC
    );

    return (
      <SideLayout num="03" title="Gallery">
        <div className="w-full">
          {/* 6열 그리드 */}
          <div className="grid grid-cols-6 gap-[20px]">
            {pcVisibleItems.map((item) => (
              <div 
                key={item.id}
                className="aspect-3/4 rounded-[8px] overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImg(item.src)}
              >
                <img src={item.src} className="w-full h-full object-cover" alt={`gallery-${item.id}`} />
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-[40px]">
            <MuiPagination
              count={TOTAL_PAGES_PC}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
            />
          </div>
        </div>
        <ImageModal />
      </SideLayout>
    );
  }

  // =========================
  // MOBILE 버전 (2 * 2 기본 + 무한스크롤)
  // =========================
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">
          
          {/* 2열 그리드 */}
          <div className="grid grid-cols-2 gap-[15px]">
            {mobileItems.map((item) => (
              <div 
                key={item.id}
                className="aspect-3/4 rounded-[8px] overflow-hidden bg-gray-100"
                onClick={() => setSelectedImg(item.src)}
              >
                <img src={item.src} className="w-full h-full object-cover" alt={`gallery-mo-${item.id}`} />
              </div>
            ))}
          </div>

          {/* 무한스크롤 감지 타겟 */}
          <div ref={observerTarget} className="w-full flex items-center justify-center mt-[20px]">
            {mobileItems.length < TOTAL_ITEMS_COUNT && <p className="text-gray-400">Loading...</p>}
          </div>
        </div>
        <ImageModal />
      </main>
    );
  }
}