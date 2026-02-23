import { AlertType } from "@/constants/alertMessage";
import { ToastType } from "@/constants/toastMessage";

export const ALERT_TO_TOAST_MAP: Partial<Record<AlertType, ToastType>> = {
  submit: "submit_success",
  save: "save_success",
  delete: "delete_success",
  logout: "logout_success",
  withdraw: "withdraw_success",
};