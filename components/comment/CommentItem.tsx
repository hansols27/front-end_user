'use client';

import React, { useState, useEffect, useRef } from 'react';
import UserInfo from '../common/UserInfo';
import CommentInput from './CommentInput'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

interface CommentItemProps {
  device: "pc" | "mo";
  profileImg?: string;
  author: string;
  date: string;
  content: string;
  isAuthor?: boolean;
  onReply?: () => void;
  onEditSubmit?: (newContent: string) => void;
  onDelete?: () => void;
}

export default function CommentItem({
  device,
  profileImg,
  author,
  date,
  content,
  isAuthor,
  onReply,
  onEditSubmit,
  onDelete,
}: CommentItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsEdit(true);
    setShowMenu(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
    setShowMenu(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSubmit = (newContent: string) => {
    if (onEditSubmit) {
      onEditSubmit(newContent); // 부모 상태 업데이트 호출
    }
    setIsEdit(false);           // 수정 모드 종료
  };

  const RenderMoreMenu = () => (
    showMenu && (
      <div className="more-menu flex flex-col">
        <div className="menu-item justify-center" onClick={handleEditClick}>
          수정하기
        </div>
        <div className="menu-item justify-center logout" onClick={handleDeleteClick}>
          삭제하기
        </div>
      </div>
    )
  );

  /* =========================
      PC 버전
  ========================= */
  if (device === "pc") {
    return (
      <div className="comment-item comment-size-pc flex flex-col w-full gap-[15px]">
        <div className="comment-info-row flex items-center justify-between w-full">
          <div className="comment-author-group flex items-center gap-[10px]">
            <UserInfo size="comment" nickname={author} profileSrc={profileImg} />
            <div className="comment-meta flex items-center gap-[10px]">
              {isAuthor && <span className="tag-author-base tag-author-comment">작성자</span>}
              <span className="comment-date text-h4 text-white">{date}</span>
            </div>
          </div>

          {!isEdit && (
            <div className="comment-side-group flex items-center gap-[15px]">
              <button type="button" onClick={onReply} className="btn-reply-write text-h5 text-white cursor-pointer">
                답글쓰기
              </button>
              <div className="relative" ref={menuRef}>
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }} 
                  size="small" 
                  sx={{ color: 'white', p: '4px' }}
                >
                  <MoreVertIcon fontSize="medium" />
                </IconButton>
                <RenderMoreMenu />
              </div>
            </div>
          )}
        </div>

        {isEdit ? (
          <CommentInput 
            device="pc"
            mode="edit"
            initialValue={content}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="comment-content text-h4 text-white leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
    );
  }

  /* =========================
      모바일 버전
  ========================= */
  if (device === "mo") {
    return (
      <div className="comment-item comment-size-mo flex flex-col w-full gap-[10px]">
        <div className="comment-info-row flex items-center justify-between w-full">
          <div className="comment-author-group flex items-center gap-[10px]">
            <UserInfo size="comment" nickname={author} profileSrc={profileImg} />
            <div className="comment-meta flex items-center gap-[10px]">
              {isAuthor && <span className="tag-author-base tag-author-comment">작성자</span>}
              <span className="comment-date text-h5 text-white">{date}</span>
            </div>
          </div>

          {!isEdit && (
            <div className="comment-side-group flex items-center gap-[10px]">
              <button type="button" onClick={onReply} className="btn-reply-write text-h6 text-white">
                답글쓰기
              </button>
              <div className="relative" ref={menuRef}>
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }} 
                  size="small" 
                  sx={{ color: 'white', p: '2px' }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <RenderMoreMenu />
              </div>
            </div>
          )}
        </div>

        {isEdit ? (
          <CommentInput 
            device="mo"
            mode="edit"
            initialValue={content}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="comment-content text-h5 text-white leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
    );
  }

  return null;
}