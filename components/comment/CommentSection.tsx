'use client';

import { useState } from "react";
import CommentInput from "@/components/comment/CommentInput";
import CommentItem from "@/components/comment/CommentItem";
import ReplyItem from "@/components/comment/ReplyItem";

interface CommentSectionProps {
  device: "pc" | "mo";
  isLoggedIn: boolean;
}

export default function CommentSection({ device, isLoggedIn }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  if (!isLoggedIn) return null;

  const handleCommentSubmit = (content: string) => {
    const newComment = {
      id: String(Date.now()),
      author: "현재사용자",
      date: "2026.02.26",
      content: content,
      isAuthor: false,
      replies: []
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleReplySubmit = (commentId: string, content: string) => {
    setComments((prev) => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: String(Date.now()),
            author: "현재사용자",
            date: "2026.02.26",
            content: content,
            isAuthor: false
          }]
        };
      }
      return comment;
    }));
    setActiveReplyId(null);
  };

  /* =========================
      PC 버전
  ========================= */
  if (device === "pc") {
    return (
      <div className="flex flex-col w-full">
        <CommentInput device="pc" mode="write" onSubmit={handleCommentSubmit} />

        <div className="flex flex-col w-full mt-[40px]">
          <div className="flex items-center gap-[20px] mb-[20px]">
            <span className="text-h4 font-bold text-white">댓글</span>
            <span className="text-h4 font-bold text-hina">{comments.length}</span>
          </div>
          <div className="w-full h-px bg-white" />

          <div className="flex flex-col gap-[20px] mt-[20px]">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col">
                {/* 1. 부모 댓글 */}
                <CommentItem
                  device="pc"
                  author={comment.author}
                  date={comment.date}
                  content={comment.content}
                  isAuthor={comment.isAuthor}
                  onReply={() => setActiveReplyId(comment.id)}
                />

                {/* 2. 댓글 직속 답글창 */}
                {activeReplyId === comment.id && (
                  <div className="mt-[20px] pl-[40px]">
                    <CommentInput 
                      device="pc" 
                      mode="write" 
                      placeholder="답글을 입력해주세요."
                      onSubmit={(content) => handleReplySubmit(comment.id, content)}
                      onCancel={() => setActiveReplyId(null)}
                    />
                  </div>
                )}

                {/* 3. 답글 목록 */}
                {comment.replies.map((reply: any) => (
                  <div key={reply.id} className="flex flex-col">
                    <div className="mt-[20px] pl-[40px]">
                      <ReplyItem
                        device="pc"
                        author={reply.author}
                        date={reply.date}
                        content={reply.content}
                        isAuthor={reply.isAuthor}
                        onReply={() => setActiveReplyId(reply.id)}
                      />
                    </div>
                    {/* 4. 답글 직속 답글창 (대대댓글용 들여쓰기 pl-80) */}
                    {activeReplyId === reply.id && (
                      <div className="mt-[20px] pl-[80px]">
                        <CommentInput 
                          device="pc" 
                          mode="write" 
                          placeholder="답글에 대한 답글을 입력해주세요."
                          onSubmit={(content) => handleReplySubmit(comment.id, content)}
                          onCancel={() => setActiveReplyId(null)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      모바일 버전
  ========================= */
  if (device === "mo") {
    return (
      <div className="flex flex-col w-full mt-[20px]">
        <CommentInput device="mo" mode="write" onSubmit={handleCommentSubmit} />

        <div className="flex flex-col w-full mt-[20px]">
          <div className="flex items-center gap-[10px] mb-[20px]">
            <span className="text-h5 font-bold text-white">댓글</span>
            <span className="text-h5 font-bold text-hina">{comments.length}</span>
          </div>
          <div className="w-full h-px bg-white" />

          <div className="flex flex-col gap-[10px] mt-[10px]">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col">
                {/* 1. 부모 댓글 */}
                <CommentItem
                  device="mo"
                  author={comment.author}
                  date={comment.date}
                  content={comment.content}
                  isAuthor={comment.isAuthor}
                  onReply={() => setActiveReplyId(comment.id)}
                />

                {/* 2. 댓글 직속 답글창 */}
                {activeReplyId === comment.id && (
                  <div className="mt-[10px]">
                    <CommentInput 
                      device="mo" 
                      mode="write" 
                      placeholder="답글을 입력해주세요."
                      onSubmit={(content) => handleReplySubmit(comment.id, content)}
                      onCancel={() => setActiveReplyId(null)}
                    />
                  </div>
                )}

                {/* 3. 답글 목록 */}
                {comment.replies.map((reply: any) => (
                  <div key={reply.id} className="flex flex-col">
                    <div className="mt-[10px] pl-[20px]">
                      <ReplyItem
                        device="mo"
                        author={reply.author}
                        date={reply.date}
                        content={reply.content}
                        isAuthor={reply.isAuthor}
                        onReply={() => setActiveReplyId(reply.id)}
                      />
                    </div>
                    {/* 4. 답글 직속 답글창 (대대댓글용 들여쓰기 pl-40) */}
                    {activeReplyId === reply.id && (
                      <div className="mt-[10px] pl-[40px]">
                        <CommentInput 
                          device="mo" 
                          mode="write" 
                          placeholder="답글에 대한 답글을 입력해주세요."
                          onSubmit={(content) => handleReplySubmit(comment.id, content)}
                          onCancel={() => setActiveReplyId(null)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}