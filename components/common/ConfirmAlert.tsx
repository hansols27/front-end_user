import { ALERT_MESSAGES, AlertType } from "@/constants/alertMessage";
import Button from "@/components/common/Button";
import { ALERT_TO_TOAST_MAP } from "@/constants/alertToToastMap";
import { TOAST_MESSAGES } from "@/constants/toastMessage";
import { toast } from "react-toastify";

interface ConfirmAlertProps {
  device: "pc" | "mo";
  type: AlertType;
  isOpen: boolean;
  onConfirm: () => void | Promise<void>;
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
  const btnSize = device === "pc" ? "md" : "sm";

  /** ✅ Confirm 버튼 클릭 핸들러 */
  const handleConfirm = async () => {
    try {
      await onConfirm();

      const toastType = ALERT_TO_TOAST_MAP[type];
      if (toastType) {
        toast.success(TOAST_MESSAGES[toastType]);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.error_system);
    }
  };

  return (
    <div className="alert-overlay">
      <div className={`alert-box ${sizeClass}`}>
        {/* 메시지 */}
        <div className="alert-message text-h4 p-[25px]">
          {data.message}
        </div>

        {/* 버튼 */}
        <div className="alert-btn-group flex gap-[10px] w-full mt-[20px]">
          <Button
            variant="black"
            size={btnSize}
            onClick={onCancel}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            variant="blue"
            size={btnSize}
            onClick={handleConfirm}
            className="flex-1"
          >
            {data.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}