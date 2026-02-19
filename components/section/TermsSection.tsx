"use client";

import { useState } from "react";
import { Checkbox } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; 
import Button from "@/components/common/Button";

interface TermsSectionProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function TermsSection({ onComplete, onBack }: TermsSectionProps) {
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const allAgreed = terms.service && terms.privacy && terms.marketing;

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTerms({ service: checked, privacy: checked, marketing: checked });
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerms({ ...terms, [e.target.name]: e.target.checked });
  };

  const canProceed = terms.service && terms.privacy;

  return (
    <div className="terms-container">
      {/* [1] 헤더: 타이틀과 전체 동의 사이 간격 40 (mb-10) */}
      <div className="relative w-full flex items-center justify-center mb-10">
        <button 
          onClick={onBack}
          className="absolute left-0 p-2 hover:opacity-60 transition-opacity"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 30, color: 'black' }} />
        </button>
        <span className="terms-title mb-0!">이용 약관 동의</span>
      </div>

      {/* [2] 전체 동의: 서브 문구와 간격 10 (mb-[10px]) */}
      <div className="terms-row mb-[10px] w-full">
        <label className="flex items-center cursor-pointer">
          <Checkbox 
            className="custom-checkbox" 
            checked={allAgreed}
            onChange={handleAllChange}
          />
          <span className="terms-checkbox-label font-bold">전체 동의하기</span>
        </label>
      </div>

      {/* [3] 서브 문구: 아래 구분선과 간격 40 (mb-10) */}
      <span className="terms-sub block w-full text-left mb-[20px]">
        서비스 이용을 위해 <span className="font-bold text-qwer-hina">[필수]</span> 약관에 모두 동의해 주세요.
      </span>

      {/* [4] 구분선: 개별 항목과 간격 20 (mb-5) */}
      <div className="w-full h-px bg-black/10 mb-[10px]" />

      {/* [5] 개별 항목 리스트: 항목 간 간격 10 (gap-[10px]) */}
      <div className="flex flex-col w-full">
        <TermItem name="service" label="[필수] 이용약관 동의" checked={terms.service} onChange={handleItemChange} />
        <TermItem name="privacy" label="[필수] 개인정보 처리방침 동의" checked={terms.privacy} onChange={handleItemChange} />
        <TermItem name="marketing" label="[선택] 마케팅 정보 수신 동의" checked={terms.marketing} onChange={handleItemChange} />
      </div>

      {/* [6] 가입 완료 버튼: 위 항목과 간격 40 (mt-10) */}
      <Button 
        variant="blue" 
        size="lg"
        disabled={!canProceed}
        onClick={onComplete}
        className="w-full mt-[40px]"
      >
        가입 완료
      </Button>
    </div>
  );
}

function TermItem({ name, label, checked, onChange }: any) {
  return (
    <div className="terms-row">
      <label className="flex items-center cursor-pointer flex-1">
        <Checkbox name={name} className="custom-checkbox" checked={checked} onChange={onChange} />
        <span className="terms-checkbox-label">{label}</span>
      </label>
      <button className="text-h5 underline text-black/40 hover:text-black shrink-0 transition-base">보기</button>
    </div>
  );
}