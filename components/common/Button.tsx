import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "blue" | "black"; // 필수 속성으로 지정
  size: "lg" | "md" | "sm";  // 필수 속성으로 지정
  className?: string;
}

export default function Button({
  children,
  variant,
  size,
  className = "",
  ...props
}: ButtonProps) {
  // 사용자가 입력한 variant와 size를 CSS 클래스로 즉시 변환
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  return (
    <button 
      className={`btn-base ${variantClass} ${sizeClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}