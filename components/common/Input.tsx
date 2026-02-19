import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  device: "pc" | "mo";   // 필수: 규격 결정
  isSearch?: boolean;     // 선택: 검색 아이콘 유무
  className?: string;
}

export default function Input({
  device,
  isSearch,
  className = "",
  ...props
}: InputProps) {
  // 1. 디바이스 크기 매핑 (input-pc 또는 input-mo)
  const sizeClass = `input-${device}`;

  // 2. 검색 모드 여부에 따른 스타일 매핑
  // isSearch가 true면 돋보기 아이콘이 포함된 .input-search 적용
  const variantClass = isSearch ? "input-search" : "input-style";

  return (
    <input
      className={`base-input ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}