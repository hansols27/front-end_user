import { useState } from "react";

interface CommentInputProps {
  device: "pc" | "mo";
  mode?: "write" | "edit"; // 입력(write) 또는 수정(edit) 상태
  initialValue?: string;
  placeholder?: string;
  onCancel?: () => void; // 취소 버튼 (주로 수정 모드에서 사용)
  onSubmit: (content: string) => void;
  className?: string;
}

export default function CommentInput({
  device,
  mode = "write",
  initialValue = "",
  placeholder = "댓글을 입력해주세요.",
  onCancel,
  onSubmit,
  className = "",
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue);

  // 1. 상태 클래스 매핑: write(회색 테두리) / edit(검정 테두리)
  const statusClass = mode === "write" ? "state-write" : "state-edit";
  
  // 2. 해상도 타입 매핑: input-type-pc / input-type-mo
  const typeClass = `input-type-${device}`;

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    if (mode === "write") setContent(""); // 새 글 작성 시에만 초기화
  };

  return (
    <div className={`comment-input-wrapper ${statusClass} ${typeClass} ${className}`}>
      {/* 내부 텍스트 영역 */}
      <textarea
        className="comment-textarea"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      {/* 하단 버튼 영역 */}
      <div className="comment-input-footer">
        {/* 수정 모드거나 취소 함수가 있을 때만 취소 버튼 노출 */}
        {(mode === "edit" || onCancel) && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn-comment-cancel btn-size"
          >
            취소
          </button>
        )}
        
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="btn-comment-save btn-size"
        >
          {mode === "write" ? "등록" : "저장"}
        </button>
      </div>
    </div>
  );
}