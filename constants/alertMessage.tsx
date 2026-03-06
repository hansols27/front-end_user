import { ReactNode } from "react";

interface AlertMessage {
  title: string;
  message: ReactNode;
  confirmText: string;
}

const formatMessage = (text: string): ReactNode => {
  return text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));
};

export const ALERT_MESSAGES: Record<string, AlertMessage> = {
  submit: {
    title: "등록",
    message: "등록하시겠습니까?",
    confirmText: "등록",
  },
  save: {
    title: "저장",
    message: "저장하시겠습니까?",
    confirmText: "저장",
  },
  delete: {
    title: "삭제",
    message: "삭제하시겠습니까?",
    confirmText: "삭제",
  },
  logout: {
    title: "로그아웃",
    message: "로그아웃 하시겠습니까?",
    confirmText: "로그아웃",
  },
  withdraw: {
    title: "회원탈퇴",
    message: formatMessage("탈퇴 시 모든 데이터가 삭제됩니다.\n계속하시겠습니까?"),
    confirmText: "회원탈퇴",
  },
  cancel: {
    title: "취소",
    message: "작성 중인 내용을 취소하시겠습니까?",
    confirmText: "확인",
  },
};

export type AlertType = keyof typeof ALERT_MESSAGES;