import { useEffect, useState } from "react";
import { TOAST_MESSAGES, ToastType } from "@/constants/toastMessage";

interface ToastProps {
  device: "pc" | "mo";
  type: ToastType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // 기본 2.5초
}

export default function Toast({
  device,
  type,
  isOpen,
  onClose,
  duration = 2500,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // 애니메이션이 끝난 후 실제 상태를 닫음
        setTimeout(onClose, 300); 
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const message = TOAST_MESSAGES[type];
  const sizeClass = device === "pc" ? "toast-size-pc" : "toast-size-mo";
  const animClass = isVisible ? "toast-show" : "toast-hide";

  return (
    <div className="toast-wrapper">
      <div className={`toast-box ${sizeClass} ${animClass}`}>
        {message}
      </div>
    </div>
  );
}