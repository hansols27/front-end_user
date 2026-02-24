'use client';

import { useDevice } from '@/hooks/useDevice';
import { siyeonSNS } from '@/data/constants';
import Image from 'next/image';

export default function MajentaSection() {
  const device = useDevice();

  if (!device) return null;

  // --- [PC 버전 전용 리턴] ---
  if (device === "pc") {
    return (
      <div className="flex flex-row items-end">
        {/* 이미지 영역: 475x555 비율 및 그림자 */}
        <div 
          className="relative w-[475px] h-[555px] bg-gray-200 shrink-0"
          style={{ boxShadow: '15px 15px 0px 0px #00c853' }} 
        >
          <img 
            src="/images/your-image.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* 텍스트 그룹: 이미지 하단 기준, 우측 80px 간격 */}
        <div className="ml-[80px] flex flex-col justify-end min-h-[555px] flex-1">
          <div className="flex flex-col text-left">
            <span className="text-h1 font-bold mb-[20px]">Siyeon</span>
            <div className="flex flex-col gap-[10px]">
              <p className="text-h2">Name : 시연 (이시연)</p>
              <p className="text-h2">Birth Day : 2000.05.16.</p>
              <p className="text-h2">Position : Main-vocal, Guitar</p>
            </div>            
          </div>
          {/* 1. 40px 하단 여백 후 라인 */}
          <div className="mt-[40px] w-full h-px bg-black" />

          {/* 2. 라인에서 40px 하단 여백 후 SNS 목록 */}
          <div className="mt-[40px] sns-list">
          {siyeonSNS.map((sns) => (
            <a 
            key={sns.name} 
            href={sns.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sns-icon relative"
            >
            <Image 
                src={sns.src} 
                alt={sns.name} 
                fill 
                className="object-contain" 
            />
            </a>
          ))}
          </div>
        </div>
      </div>
    );
  }

  // --- [모바일 버전 전용 리턴] ---
  if (device === "mo") {
    return (
      <div className="flex flex-col w-full py-[20px]">
        {/* 이미지 영역 */}
          <div
            className="relative w-full aspect-475/555 bg-gray-200 mx-auto"
            style={{ boxShadow: '10px 10px 0px 0px #00c853' }}
          >
            <img
              src="/images/your-image.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

        {/* 텍스트 그룹: 이미지 하단 배치 */}
        <div className="w-full mt-[20px] flex flex-col text-left">
          <span className="text-h3 font-bold mb-[10px]">Siyeon</span>
            <div className="flex flex-col gap-[5px]">
              <p className="text-h4">Name : 시연 (이시연)</p>
              <p className="text-h4">Birth Day : 2000.05.16.</p>
              <p className="text-h4">Position : Main-vocal, Guitar</p>
            </div>        

            {/* 1. 20px 하단 여백 후 라인 */}
            <div className="mt-[20px] w-full h-px bg-black" />

            {/* 2. 라인에서 20px 하단 여백 후 SNS 목록 */}
            <div className="mt-[20px] sns-list">
            {siyeonSNS.map((sns) => (
                <a 
                key={sns.name} 
                href={sns.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sns-icon relative"
                >
                <Image 
                    src={sns.src} 
                    alt={sns.name} 
                    fill 
                    className="object-contain" 
                />
                </a>
            ))}
            </div>    
        </div>        
      </div>
    );
  }

  return null;
}