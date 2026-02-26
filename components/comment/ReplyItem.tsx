'use client';

import React from 'react';
import UserInfo from '../common/UserInfo';
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
  onMore?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ReplyItem({
  device,
  profileImg,
  author,
  date,
  content,
  isAuthor,
  onReply,
  onMore,
}: ReplyItemProps) {
  
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

          {/* 우측: 더보기 */}
          <div className="comment-side-group">
            <button type="button" onClick={onReply} className="btn-reply-write text-h5 text-white cursor-pointer">
              답글쓰기
            </button>
            <IconButton onClick={onMore} size="small" sx={{ color: 'white', p: '4px' }}>
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>

        {/* [2단] 내용 영역: ㄴ 아이콘 너비만큼 들여쓰기(pl-[28px]) + 흰색 텍스트 */}
        <div className="reply-content-wrapper text-h4 text-white leading-relaxed whitespace-pre-wrap pl-[30px]">
          {content}
        </div>
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
          <div className="comment-side-group">
            <button type="button" onClick={onReply} className="btn-reply-write text-h6 text-white">
              답글쓰기
            </button>
            <IconButton onClick={onMore} size="small" sx={{ color: 'white', p: '2px' }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        {/* [2단] 내용 영역: ㄴ 아이콘 너비만큼 들여쓰기(pl-[20px]) + 흰색 텍스트 */}
        <div className="reply-content-wrapper text-h5 text-white leading-relaxed whitespace-pre-wrap pl-[20px]">
          {content}
        </div>
      </div>
    );
  }

  return null;
}