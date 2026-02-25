'use client';

import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  getDay,
  isToday
} from 'date-fns';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useDevice } from '@/hooks/useDevice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarSectionProps {
  currentMonth: Date;
  selectedDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export default function CalendarSection({ 
  currentMonth, 
  selectedDate,
  onPrevMonth, 
  onNextMonth,
  onDateSelect,
  onMonthChange 
}: CalendarSectionProps) {

  const device = useDevice();
  const [open, setOpen] = useState(false);
  if (!device) return null;

  // --- 캘린더 날짜 계산 로직 ---
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // --- 공통 달력 그리드 렌더링 ---
  const renderCalendarGrid = () => (
    <div className="w-full bg-white rounded-base border border-white/10 p-5">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-6">
        {weekDays.map((day, i) => (
          <div 
            key={i} 
            className={`text-center text-h6 font-bold ${(i === 0 || i === 6) ? 'text-red-500' : 'text-gray-sub'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 숫자 */}
      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);
          const dayOfWeek = getDay(day);
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          return (
            <div 
              key={i} 
              onClick={() => onDateSelect(day)}
              className={`
                aspect-square flex items-center justify-center cursor-pointer text-h5 rounded-full transition-all border-2
                ${!isCurrentMonth ? 'opacity-10 pointer-events-none' : 'opacity-100'}
                /* [선택한 일자] 테두리 color-hina */
                ${isSelected ? 'border-hina font-bold' : 'border-transparent font-medium'}
                /* [오늘 일자] 텍스트 color-hina / 주말 레드 / 평일 화이트 */
                ${isDayToday ? 'text-hina' : isWeekend ? 'text-red-500' : 'text-black'}
                /* 호버 효과 */
                ${!isSelected && 'hover:bg-white/10'}
              `}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHeader = (titleClass: string) => (
    <div className="flex items-center justify-between mb-[30px]">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="relative">
          <div 
            className={`flex items-center gap-[10px] font-bold text-white cursor-pointer hover:text-hina transition-colors ${titleClass}`}
            onClick={() => setOpen(true)}
          >
            {format(currentMonth, 'yyyy. MM')}
            <ChevronRightIcon className="rotate-90 w-5 h-5 opacity-50" />
          </div>

          <div className="absolute top-0 left-0 opacity-0 pointer-events-none">
            <DatePicker
              views={['year', 'month']}
              open={open}
              onClose={() => setOpen(false)}
              value={currentMonth}
              onChange={(newValue) => {
                if (newValue) {
                  /* 핵심 수정: onDateSelect 대신 onMonthChange를 호출하여 달력을 이동시킵니다. */
                  onMonthChange(newValue); 
                  setOpen(false); // 선택 후 닫기
                }
              }}
            />
          </div>
        </div>
      </LocalizationProvider>

      <div className="flex items-center gap-[15px]">
        <ChevronLeftIcon className="cursor-pointer hover:text-hina" onClick={onPrevMonth} />
        <ChevronRightIcon className="cursor-pointer hover:text-hina" onClick={onNextMonth} />
      </div>
    </div>
  );

  if (device === 'pc') {
    return (
      <section className="w-full lg:w-[450px] shrink-0">
        {renderHeader('text-h3')}
        {renderCalendarGrid()}
      </section>
    );
  }

  if (device === 'mo') {
    return (
      <section className="w-full shrink-0">
        {renderHeader('text-h4')}
        {renderCalendarGrid()}
      </section>
    );
  }

  return null;
}