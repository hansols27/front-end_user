import { ALERT_MESSAGES, AlertType } from "@/constants/alertMessage";
import Button from "@/components/common/Button"; // 버튼 컴포넌트 임포트

interface ConfirmAlertProps {
  device: "pc" | "mo";
  type: AlertType;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmAlert({
  device,
  type,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmAlertProps) {
  if (!isOpen) return null;

  const data = ALERT_MESSAGES[type];
  const sizeClass = device === "pc" ? "alert-size-pc" : "alert-size-mo";
  
  // 디바이스에 따른 버튼 사이즈 결정
  const btnSize = device === "pc" ? "md" : "sm";

  return (
    <div className="alert-overlay">
      <div className={`alert-box ${sizeClass}`}>        
        
        {/* [1단] 메시지 내용 */}
        <div className="alert-message text-h4 p-[25px]">{data.message}</div>

        {/* [2단] 버튼 그룹: 공통 Button 컴포넌트 적용 */}
        <div className="alert-btn-group flex gap-[10px] w-full mt-[20px]">
          <Button 
            variant="black" 
            size={btnSize}
            onClick={onCancel}
            className="flex-1" // 버튼이 동일한 너비를 갖도록 설정
          >
            취소
          </Button>
          <Button 
            variant="blue" 
            size={btnSize}
            onClick={onConfirm}
            className="flex-1"
          >
            {data.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}