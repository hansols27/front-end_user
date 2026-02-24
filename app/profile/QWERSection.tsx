'use client';

import { useDevice } from '@/hooks/useDevice';

export default function QWERSection() {
  const device = useDevice();

  if (!device) return null;

  // --- [PC 버전 전용 리턴] ---
  if (device === "pc") {
    return (
      <div className="flex flex-row items-end">
        {/* 이미지 영역: 475x555 비율 및 그림자 */}
        <div 
          className="relative w-[475px] h-[555px] bg-gray-200 shrink-0"
          style={{ boxShadow: '15px 15px 0px 0px rgba(0, 0, 0, 1)' }} // x:15, y:15 블랙 그림자
        >
          <img 
            src="/images/your-image.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* 텍스트 그룹: 이미지 하단 기준, 우측 80px 간격 */}
        <div className="ml-[80px] flex flex-col justify-end min-h-[555px]">
          <div className="flex flex-col text-left">
            <span className="text-h1 font-bold mb-[20px]">QWER</span>
            <div className="flex flex-col gap-[10px]">
              <p className="text-h2">Debut : 2023.10.18</p>
              <p className="text-h2">Member : Chodan, Magenta, Hina, Siyeon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- [모바일 버전 전용 리턴] ---
  if (device === "mo") {
    return (
      <div className="flex flex-col w-full py-[20px]">
        {/* 이미지 영역: 
           1. w-full로 부모 여백(35px)을 제외한 나머지를 꽉 채움
           2. aspect-ratio를 직접 스타일로 주어 475:555 비율 유지
        */}
        <div 
          className="relative w-full bg-gray-200 shrink-0"
          style={{ 
            aspectRatio: '475 / 555',
            boxShadow: '10px 10px 0px 0px rgba(0, 0, 0, 1)' 
          }}
        >
          <img 
            src="/images/your-image.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
  
        {/* 텍스트 그룹: 이미지 하단 배치 */}
        <div className="w-full mt-[20px] flex flex-col text-left">
          <span className="text-h3 font-bold mb-[10px]">QWER</span>
          <div className="flex flex-col gap-[5px]">
            <p className="text-h4">Debut : 2023.10.18</p>
            <p className="text-h4">Member : Chodan, Magenta, Hina, Siyeon</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}