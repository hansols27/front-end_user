interface ReplyItemProps {
    device: "pc" | "mo";
    profileImg?: string;
    author: string;
    date: string;
    content: string;
    isAuthor?: boolean; // 게시글 작성자 여부
    onMore?: () => void;
  }
  
  export default function ReplyItem({
    device,
    profileImg,
    author,
    date,
    content,
    isAuthor,
    onMore,
  }: ReplyItemProps) {
    const sizeClass = `comment-size-${device}`;
  
    return (
      <div className={`reply-item ${sizeClass}`}>
        {/* [1단] 상단 정보 영역 */}
        <div className="comment-info-row">
          <div className="comment-author-group">
            <div className="icon-reply-arrow">ㄴ</div>
            <img 
              src={profileImg || "/default-profile.png"} 
              className="comment-profile-img" 
              alt={author} 
            />
            <div className="comment-meta">
              <span>{author}</span>
              {/* 답글 작성자 태그: tag-author-reply (블루) */}
              {isAuthor && <span className="tag-author-reply">작성자</span>}
              <span className="comment-date">{date}</span>
            </div>
          </div>
  
          <div className="comment-side-group">
          <button 
            type="button" 
            onClick={onMore} 
            className="btn-comment-more" 
            aria-label="더보기"
          />
          </div>
        </div>
  
        {/* [2단] 내용 영역: 답글 전용 들여쓰기 래퍼 적용 */}
        <div className="reply-content-wrapper comment-content leading-relaxed text-black">
          {content}
        </div>
      </div>
    );
  }