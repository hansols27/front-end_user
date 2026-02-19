import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;      // 라벨 텍스트 (전달 시 select-labeled 적용)
  device: "pc" | "mo"; // 규격 결정
  options: { value: string; label: string }[];
}

export default function Select({ 
  label, 
  device, 
  options, 
  className = "", 
  ...props 
}: SelectProps) {
  // 1. 디바이스 크기 클래스 생성
  const sizeClass = `select-${device}`;
    
  // 2. 라벨 유무에 따른 클래스 분기
  // label이 존재하면 왼쪽 여백이 포함된 클래스를 선택합니다.
  const variantClass = label ? "select-labeled" : "select-style";
    
  return (
    <div className={`select-wrapper ${className}`}>
      {/* 라벨이 있을 때만 화면에 표시 */}
      {label && <span className="select-inner-label">{label}</span>}
          
      <select 
        className={`select-base ${variantClass} ${sizeClass} ${className}`} 
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}