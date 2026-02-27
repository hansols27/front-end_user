'use client';

import React, { useState, useEffect, useRef } from 'react';
import UserInfo from '../common/UserInfo';
import CommentInput from './CommentInput';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

interface ReplyItemProps {
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

export default function ReplyItem({
  device,
  profileImg,
  author,
  date,
  content,
  isAuthor,
  onReply,
  onEditSubmit,
  onDelete,
}: ReplyItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기
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
    e.stopPropagation(); // 이벤트 전파 방지
    setIsEdit(true);
    setShowMenu(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지    
      onDelete?.();
      setShowMenu(false);    
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSubmit = (newContent: string) => {
    // 1. 부모의 데이터를 바꾸는 함수 실행
    onEditSubmit?.(newContent); 
    // 2. 수정 모드 종료 (부모가 리렌더링되면서 새로운 content가 내려옴)
    setIsEdit(false); 
  };

  // 더보기 메뉴 (수정하기/삭제하기)
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
      <div className="reply-item comment-size-pc flex flex-col w-full gap-[15px]">
        {/* [1단] 상단 정보 영역 */}
        <div className="comment-info-row flex items-start justify-between w-full">
          
          {/* 좌측: ㄴ 아이콘 + (UserInfo + 작성일) */}
          <div className="flex gap-[15px]">
            <span className="text-white text-h4 mt-[5px]">ㄴ</span>
            <div className="comment-author-group flex items-center gap-[10px]">
              <UserInfo 
                size="comment" 
                nickname={author} 
                profileSrc={profileImg} 
              />
              <div className="comment-meta flex items-center gap-[10px]">
                {isAuthor && <span className="tag-author-base tag-author-reply">작성자</span>}
                <span className="comment-date text-h5 text-white">{date}</span>
              </div>
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

        {/* [2단] 내용 영역: ㄴ 아이콘 너비만큼 들여쓰기(pl-[28px]) + 흰색 텍스트 */}
        {/* 수정 모드 시 CommentInput 활용 */}
        {isEdit ? (
          <CommentInput 
            device="pc"
            mode="edit"
            initialValue={content}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="reply-content-wrapper text-h4 text-white leading-relaxed whitespace-pre-wrap pl-[30px]">
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
      <div className="reply-item comment-size-mo flex flex-col w-full gap-[10px]">
        {/* [1단] 상단 정보 영역 */}
        <div className="comment-info-row flex items-start justify-between w-full">
          
          {/* 좌측: ㄴ 아이콘 + (UserInfo + 작성일) */}
          <div className="flex gap-[10px]">
            <span className="text-white text-h5 mt-[5px]">ㄴ</span>
            <div className="comment-author-group flex items-center gap-[10px]">
              <UserInfo 
                size="comment" 
                nickname={author} 
                profileSrc={profileImg} 
              />
              <div className="comment-meta flex items-center gap-[6px]">
                {isAuthor && <span className="tag-author-base tag-author-reply">작성자</span>}
                <span className="comment-date text-h6 text-white">{date}</span>
              </div>
            </div>
          </div>

          {/* 우측: 더보기 */}
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

        {/* [2단] 내용 영역: ㄴ 아이콘 너비만큼 들여쓰기(pl-[20px]) + 흰색 텍스트 */}
        {/* 수정 모드 시 CommentInput 활용 */}
        {isEdit ? (
          <CommentInput 
            device="mo"
            mode="edit"
            initialValue={content}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="reply-content-wrapper text-h5 text-white leading-relaxed whitespace-pre-wrap pl-[20px]">
            {content}
          </div>
        )}
      </div>
    );
  }

  return null;
}