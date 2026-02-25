'use client';

import { format } from 'date-fns';
import { useDevice } from '@/hooks/useDevice';

interface ScheduleDetailProps {
  selectedDate: Date;
  scheduleContent: string;
}

export default function ScheduleDetail({ 
    selectedDate, 
    scheduleContent, 
  }: ScheduleDetailProps) {

  const device = useDevice();
  if (!device) return null;

  // =========================
  // PC 버전
  // =========================
  if (device === 'pc') {
    return (
      <article className="flex-1 flex flex-col items-start w-full">
        {/* 선택한 일자: text-h3, 하단 간격 20px */}
        <span className="text-h3 font-bold text-white mb-[20px]">
          {format(selectedDate, 'yyyy. MM. dd')}
        </span>
        
        {/* 라인: 하단 간격 20px */}
        <div className="w-full h-px bg-white opacity-30 mb-[20px]" />
        
        {/* 일정 내용: text-h4 */}
        <p className="text-h4 text-gray-sub leading-relaxed text-left">
          {scheduleContent}
        </p>
      </article>
    );
  }

  // =========================
  // MOBILE 버전
  // =========================
  if (device === 'mo') {
    return (
      <article className="flex-1 flex flex-col items-start w-full">
        {/* 선택한 일자: text-h4, 하단 간격 10px */}
        <span className="text-h4 font-bold text-white mb-[10px]">
          {format(selectedDate, 'yyyy. MM. dd')}
        </span>
        
        {/* 라인: 하단 간격 10px */}
        <div className="w-full h-px bg-white opacity-30 mb-[10px]" />
        
        {/* 일정 내용: text-h5 */}
        <p className="text-h5 text-gray-sub leading-relaxed text-left">
          {scheduleContent}
        </p>
      </article>
    );
  }

  return null;
}