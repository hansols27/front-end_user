interface TabProps {
    label: string;
    variant: "line" | "box";
    device: "pc" | "mo";
    isActive: boolean;
    onClick: () => void;
    className?: string;
  }
  
  export default function Tab({
    label,
    variant,
    device,
    isActive,
    onClick,
    className = "",
  }: TabProps) {
    // 1. 기본 크기 클래스 (tab-pc 또는 tab-mo)
    const sizeClass = `tab-${device}`;
  
    // 2. 스타일 및 활성화 상태 매핑
    // 예: variant가 "line"이고 활성화면 "tab-line-active", 아니면 "tab-line"
    const activeSuffix = isActive ? "-active" : "";
    const variantClass = `tab-${variant}${activeSuffix}`;
  
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${variantClass} ${sizeClass} ${className}`}
      >
        {label}
      </button>
    );
  }