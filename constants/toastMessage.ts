export const TOAST_MESSAGES = {
    submit_success: "등록 되었습니다.",
    save_success: "저장 되었습니다.",
    delete_success: "삭제 되었습니다.",
    logout_success: "로그아웃 되었습니다.",
    withdraw_success: "탈퇴 되었습니다.",
    error_system: "시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  } as const;
  
  export type ToastType = keyof typeof TOAST_MESSAGES;