'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import DiscographyCard from '@/app/discography/DiscographyCard';

// 임시 데이터 (나중에 constants로 분리하세요)
const ALBUM_LIST = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: `Album Title ${i + 1}`,
  date: '2023.10.18',
  src: '/images/album/placeholder.png', // 실제 경로로 변경 필요
}));

export default function DiscographyPage() {
  const device = useDevice();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!shouldRedirect) return;
    const timer = setTimeout(() => {
      router.push('/');
      setShouldRedirect(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [shouldRedirect, router]);
  
  if (!device) return null;

  // =========================
  // PC 버전
  // =========================
  if (device === 'pc') {
    return (        
      <SideLayout num="02" title="Discography">           
        <div className="w-full">
            <div className="grid grid-cols-4 gap-x-[20px] gap-y-[60px]">
                {ALBUM_LIST.map((album) => (
                  <DiscographyCard
                      key={album.id}
                      title={album.title}
                      date={album.date}
                      src={album.src}
                      onClick={() => router.push(`/discography/${album.id}`)}
                  />
                ))}
            </div>
        </div>
        </SideLayout>
        );
    }

  // =========================
  // MOBILE 버전
  // =========================
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">          

          {/* 모바일: 2열 그리드 (좌우 35px 여백 안쪽에서 작동) */}
          <div className="grid grid-cols-2 gap-x-[15px] gap-y-[40px]">
            {ALBUM_LIST.map((album) => (
              <DiscographyCard
                key={album.id}
                title={album.title}
                date={album.date}
                src={album.src}
                onClick={() => router.push(`/discography/${album.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return null;
}