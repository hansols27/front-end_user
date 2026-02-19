import React from 'react';
import UserInfo from '../common/UserInfo'; // 앞서 만든 컴포넌트 임포트

interface CommentItemProps {
  device: "pc" | "mo";
  profileImg?: string;
  author: string;
  date: string;
  content: string;
  isAuthor?: boolean; // 게시글 작성자 여부
  onReply?: () => void;
  onMore?: () => void;
}

export default function CommentItem({
  device,
  profileImg,
  author,
  date,
  content,
  isAuthor,
  onReply,
  onMore,
}: CommentItemProps) {
  const sizeClass = `comment-size-${device}`;

  return (
    <div className={`comment-item ${sizeClass}`}>
      {/* [1단] 상단 정보 영역 */}
      <div className="comment-info-row">
        <div className="comment-author-group">
          {/* 공통 컴포넌트 UserInfo 활용: 댓글용(30*30) 사이즈 적용 */}
          <UserInfo 
            size="comment" 
            nickname={author} 
            profileSrc={profileImg} 
          />
          
          {/* 메타 정보: 닉네임 바로 뒤에 배치 */}
          <div className="comment-meta">
            {isAuthor && <span className="tag-author-comment">작성자</span>}
            <span className="comment-date">{date}</span>
          </div>
        </div>

        <div className="comment-side-group">
          <button type="button" onClick={onReply} className="btn-reply-write">
            답글쓰기
          </button>
          <button 
            type="button" 
            onClick={onMore} 
            className="btn-comment-more" 
            aria-label="더보기"
          />
        </div>
      </div>

      {/* [2단] 내용 영역 */}
      <div className="comment-content leading-relaxed text-black">
        {content}
      </div>
    </div>
  );
}