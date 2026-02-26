'use client';

import { useState, ChangeEvent } from "react";
import Button from "@/components/common/Button";

interface CommentInputProps {
  device: "pc" | "mo";
  mode?: "write" | "edit";
  initialValue?: string;
  placeholder?: string;
  onCancel?: () => void;
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
  const MAX_LENGTH = 500;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    if (mode === "write") setContent("");
  };

  /* =========================
      PC 버전 (전체 H: 225px)
  ========================= */
  if (device === "pc") {
    return (
      <div className={`textarea-container ${className} h-[125px]`}>
        <textarea
          className="textarea-input text-h4"
          placeholder={placeholder}
          value={content}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
        />
        
        {/* 간격 20px 적용 */}
        <div className="textarea-footer mt-[20px]">
          <div className="flex gap-[10px]">
            {(mode === "edit" || onCancel) && (
              <Button variant="black" size="md" onClick={onCancel} className="w-[100px]">
                취소
              </Button>
            )}
            <Button variant="black" size="md" onClick={handleSubmit} className="w-[100px]">
              {mode === "write" ? "등록" : "저장"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      모바일 버전 (전체 H: 185px)
  ========================= */
  if (device === "mo") {
    return (
      <div className={`textarea-container ${className} h-[85px]`}>
        <textarea
          className="textarea-input text-h5"
          placeholder={placeholder}
          value={content}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
        />
        
        {/* 간격 10px 적용 */}
        <div className="textarea-footer mt-[10px]">
          
          <div className="flex gap-[10px]">
            {(mode === "edit" || onCancel) && (
              <Button variant="black" size="sm" onClick={onCancel} className="w-[80px]">
                취소
              </Button>
            )}
            <Button variant="black" size="sm" onClick={handleSubmit} className="w-[80px]">
              {mode === "write" ? "등록" : "저장"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}