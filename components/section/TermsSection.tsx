'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import { TERMS } from '@/data/constants';

interface TermsSectionProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function TermsSection({
  onComplete,
  onBack,
}: TermsSectionProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = TERMS.every(term => checked[term.id]);
  const requiredChecked = TERMS
    .filter(t => t.required)
    .every(t => checked[t.id]);

  /* handlers */
  const toggleAll = () => {
    const next = !allChecked;
    const newState: Record<string, boolean> = {};
    TERMS.forEach(t => (newState[t.id] = next));
    setChecked(newState);
  };

  const toggleOne = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col gap-[30px]">

      {/* title */}
      <div className="text-center">
        <span className="text-h3 font-bold">약관 동의</span>
      </div>

      {/* 전체 동의 */}
      <div className="flex items-start gap-[15px] border-b pb-[15px]">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={toggleAll}
          className="scale-150 origin-left mt-[5px]"
        />
        <div>
          <span className="text-h4 font-bold block">전체 동의</span>          
        </div>
        <p className="text-h5 text-black/60 mt-[5px]">
            서비스 이용을 위해 약관에 동의해주세요
          </p>
      </div>

      {/* 약관 리스트 */}
      <div className="flex flex-col gap-[15px]">
        {TERMS.map(term => (
          <div
            key={term.id}
            className="flex items-center gap-[10px]"
          >
            {/* 좌측 */}
            <label className="flex items-center gap-[15px] flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={!!checked[term.id]}
                onChange={() => toggleOne(term.id)}
                className="scale-150 origin-left"
              />
              <span className="text-h5">
                {term.label}
                {term.required && (
                  <span className="text-red-500 ml-1">(필수)</span>
                )}
              </span>
            </label>

            {/* 우측 보기 */}
            <button
              type="button"
              className="text-h5 underline text-black/50 shrink-0"
            >
              보기
            </button>
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="flex gap-[10px] pt-[10px]">
        <Button
          variant="black"
          size="md"
          className="flex-1"
          onClick={onBack}
        >
          이전
        </Button>
        <Button
          variant="blue"
          size="md"
          className="flex-1"
          disabled={!requiredChecked}
          onClick={onComplete}
        >
          가입 완료
        </Button>
      </div>
    </div>
  );
}