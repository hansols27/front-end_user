interface NotificationProps {
    device: "pc" | "mo";
    title: string;       // 1단: 알림 제목
    message: string;     // 2단: 알림 본문
    date: string;        // 3단 우측: 날짜 (필수)
    author: string;      // 3단 좌측: 작성자 (필수)
    isRead: boolean;     // 읽음 상태
    onClick?: () => void;
    className?: string;
  }
  
  export default function Notification({
    device,
    title,
    message,
    date,
    author,
    isRead,
    onClick,
    className = "",
  }: NotificationProps) {
    const statusClass = isRead ? "noti-read" : "";
    const sizeClass = device === "pc" ? "card-pc" : "card-mo";
  
    return (
      <div 
        className={`noti-card ${statusClass} ${sizeClass} ${className}`} 
        onClick={onClick}
      >
        {/* [1단] 상단: 제목 + 레드닷 */}
        <div className="noti-row-top">
          <span className="card-title noti-title">{title}</span>
          {!isRead && <div className="noti-red-dot" />}
        </div>
  
        {/* [2단] 중단: 알림 본문 내용 */}
        <div className="noti-row-mid card-sub noti-msg">
          {message}
        </div>
  
        {/* [3단] 하단: 좌측(작성자) / 우측(날짜) 분리 배치 */}
        <div className="flex items-center justify-between w-full card-sub">
          <span>{author}</span>
          <span className="text-gray-400">{date}</span>
        </div>
      </div>
    );
  }