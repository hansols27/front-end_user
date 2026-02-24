'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';

const VIDEO_DATA = Array.from({ length: 50 }).map((_, i) => ({
  id: `v${i}`,
  youtubeId: "vMvI-uNoxjM", // 샘플 ID
  thumbnail: `https://img.youtube.com/vi/vMvI-uNoxjM/0.jpg`,
}));

export default function VideoPage() {
  const device = useDevice();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_DATA[0]);
  const [mobileItems, setMobileItems] = useState(VIDEO_DATA.slice(0, 10));
  const observerTarget = useRef<HTMLDivElement>(null);
  const mainVideoContainerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number>(0);

  // PC에서 왼쪽 영상 높이에 맞춰 오른쪽 리스트 높이 계산
  useEffect(() => {
    if (device === 'pc' && mainVideoContainerRef.current) {
      const updateHeight = () => {
        setListHeight(mainVideoContainerRef.current?.offsetHeight || 0);
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [device]);

  // 모바일 무한 스크롤
  const loadMoreVideos = useCallback(() => {
    setMobileItems((prev) => {
      const nextItems = VIDEO_DATA.slice(prev.length, prev.length + 10);
      return [...prev, ...nextItems];
    });
  }, []);

  useEffect(() => {
    if (device !== 'mo' || !observerTarget.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && mobileItems.length < VIDEO_DATA.length) {
          loadMoreVideos();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [device, mobileItems.length, loadMoreVideos]);

  if (!device) return null;

  const VideoPlayer = ({ id }: { id: string }) => (
    <div className="w-full aspect-video rounded-[12px] overflow-hidden bg-black shadow-lg">
      <iframe
        className="w-full h-full border-none"
        src={`https://www.youtube.com/embed/${id}?enablejsapi=1`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  // =========================
  // PC 버전 (2단 구조)
  // =========================
  if (device === 'pc') {
    return (
      <SideLayout num="04" title="Video">
        <div className="flex w-full gap-[40px] items-start">
          {/* 1단: 메인 영상 (캡션 제거) */}
          <div ref={mainVideoContainerRef} className="flex-3 min-w-0">
            <VideoPlayer id={selectedVideo.youtubeId} />
          </div>

          {/* 2단: 사이드 리스트 (간격 40px 유지, 높이 동기화) */}
          <div 
            className="flex-1 min-w-[280px] overflow-y-auto flex flex-col gap-[15px] pr-[5px] custom-scrollbar"
            style={{ height: listHeight > 0 ? `${listHeight}px` : 'auto' }}
          >
            {VIDEO_DATA.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`cursor-pointer rounded-[8px] overflow-hidden border-2 transition-all shrink-0 aspect-video
                  ${selectedVideo.id === video.id ? 'border-[#00a8ff]' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={video.thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </SideLayout>
    );
  }

  // =========================
  // MOBILE 버전 (무한 스크롤)
  // =========================
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content flex flex-col">
          {/* 영상 목록 리스트 (간격 20px) */}
          <div className="flex flex-col gap-[20px]">
            {mobileItems.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)} // 상태 업데이트
                className={`rounded-[12px] overflow-hidden border-2 transition-all aspect-video relative
                  ${selectedVideo.id === video.id ? 'border-[#00a8ff]' : 'border-transparent shadow-sm'}`}
              >
                {selectedVideo.id === video.id ? (
                  /* 1. 선택된 영상: 이 자리에서 바로 재생 */
                  <iframe
                    className="w-full h-full border-none"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1`}
                    title="Mobile Video Player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  /* 2. 선택되지 않은 영상: 썸네일 노출 */
                  <div className="w-full h-full relative cursor-pointer">
                    <img 
                      src={video.thumbnail} 
                      alt="thumbnail" 
                      className="w-full h-full object-cover" 
                    />                    
                  </div>
                )}
              </div>
            ))}
          </div>
  
          <div ref={observerTarget} className="w-full" />
        </div>
      </main>
    );
  }
}