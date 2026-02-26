'use client';

import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import ScheduleDetail from '@/app/schedule/ScheduleDetail'; 
import CalendarSection from '@/app/schedule/CalendarSection'; 

export default function SchedulePage() {
  const device = useDevice();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduleData: Record<string, string> = {
    [format(new Date(), 'yyyy-MM-dd')]: "오늘은 프로젝트 런칭 데이입니다. 전체 팀 회의 및 최종 점검이 예정되어 있습니다.",
  };

  const scheduleContent = scheduleData[format(selectedDate, 'yyyy-MM-dd')] || "등록된 일정이 없습니다.";

  // 핸들러 함수들 (중복 선언되지 않도록 하나씩만 작성)
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    setSelectedDate(date); // 월 이동 시 해당 월의 선택 상태 업데이트
  };

  if (!device) return null;

  const commonProps = {
    currentMonth,
    selectedDate,
    onPrevMonth: () => setCurrentMonth((prev) => subMonths(prev, 1)),
    onNextMonth: () => setCurrentMonth((prev) => addMonths(prev, 1)),
    onDateSelect: handleDateSelect,
    onMonthChange: handleMonthChange,
  };

  if (device === 'pc') {
    return (
      <SideLayout num="05" title="Schedule">
        <div className="flex flex-row gap-[80px] items-start w-full">
          <ScheduleDetail selectedDate={selectedDate} scheduleContent={scheduleContent} />
          <CalendarSection {...commonProps} />
        </div>
      </SideLayout>
    );
  }

  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content flex flex-col gap-[40px]">
          <CalendarSection {...commonProps} />
          <ScheduleDetail selectedDate={selectedDate} scheduleContent={scheduleContent} />          
        </div>
      </main>
    );
  }
}