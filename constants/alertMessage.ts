export const ALERT_MESSAGES = {
    submit: {
      title: "등록하시겠습니까?",
      message: "입력하신 내용이 등록됩니다.",
      confirmText: "등록",
    },
    save: {
      title: "저장하시겠습니까?",
      message: "수정된 내용이 반영됩니다.",
      confirmText: "저장",
    },
    delete: {
      title: "삭제하시겠습니까?",
      message: "삭제된 데이터는 복구할 수 없습니다.",
      confirmText: "삭제",
    },
    logout: {
      title: "로그아웃",
      message: "로그아웃 하시겠습니까?",
      confirmText: "로그아웃",
    },
    withdraw: {
      title: "회원 탈퇴",
      message: "탈퇴 시 모든 데이터가 삭제됩니다. 계속하시겠습니까?",
      confirmText: "회원탈퇴",
    },
    cancel: { 
      title: "취소", 
      message: "작성 중인 내용을 취소하시겠습니까?", 
      confirmText: "확인" 
    },
  } as const;
  
  export type AlertType = keyof typeof ALERT_MESSAGES;