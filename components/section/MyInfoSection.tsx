import { useState } from 'react';
import UserInfo from '@/components/common/UserInfo';
import Button from '../common/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface MyInfoSectionProps {
  user: any;
  device: "pc" | "mo";
}

export default function MyInfoSection({ user, device }: MyInfoSectionProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempNickname, setTempNickname] = useState(user?.nickname || "Guest");
  
  // --- [PC 버전 전용 리턴] ---
  if (device === "pc") {
    return (
      <div className="flex flex-col w-full gap-[40px]">
        {/* PC 프로필: 왼쪽 정렬, 닉네임 수정 모드 */}
        <div className="flex flex-row items-start">
          <UserInfo
            type="row"
            size="mypage-pc"
            nickname={!isEditMode ? tempNickname : ""}
            profileSrc={user?.profileImage}
            isEdit={true}
          />

          {/* 수정 모드일 때 나타나는 입력 필드 */}
          {isEditMode && (
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-transparent border-b border-black outline-none text-h4 font-bold pb-1 w-[150px]"
                autoFocus
              />
            )}

            {/* 수정/저장 버튼 */}
            <Button 
              variant="black" 
              size="sm" 
              className="w-[80px]"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "저장" : "수정"}
            </Button>

          {/* 알림 영역: 아이콘 + 텍스트 + 알림 수 */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer">
            <div className="relative">
              <NotificationsIcon className="text-black w-[30px] h-[30px]" />
                
              {/* 알림 텍스트와 숫자가 가로로 이어짐 */}
              <div className="flex flex-row items-center gap-[4px] text-h4 font-medium">
                <span>알림</span>
                  {/* 알림 수가 있을 때만 숫자가 표시되도록 설정 */}
                  <span className="text-black">
                    {user?.unreadCount || 0}
                  </span>
              </div>
            </div>  
          </div>
        </div>  

        {/* PC 정보 그리드: 4열 배열 */}
        <div className="pc-infobox">
          <div className="pc-infoitem">
            <span className="infolabel">이름</span>
            <span className="infodata">{user?.name || "홍길동"}</span>
          </div>
          <div className="pc-infoitem">
            <span className="infolabel">이메일</span>
            <span className="infodata">{user?.email || "example@email.com"}</span>
          </div>
          <div className="pc-infoitem">
            <span className="infolabel">닉네임</span>
            <span className="infodata">{user?.nickname || "히나"}</span>
          </div>
          <div className="pc-infoitem">
            <span className="infolabel">가입일</span>
            <span className="infodata">2026.01.20</span>
          </div>
        </div>
      </div>
    );
  }

  // --- [모바일 버전 전용 리턴] ---
  if (device === "mo") {
    return (
      <div className="flex flex-col w-full gap-[40px]">
        {/* 모바일 프로필: 왼쪽 정렬, 닉네임 수정 모드 */}
        <div className="flex flex-row items-start">
          <UserInfo
            type="row"
            size="mypage-mo"
            nickname={!isEditMode ? tempNickname : ""}
            profileSrc={user?.profileImage}
            isEdit={true}
          />

          {/* 수정 모드일 때 나타나는 입력 필드 */}
          {isEditMode && (
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-transparent border-b border-black outline-none text-h4 font-bold pb-1 w-[150px]"
                autoFocus
              />
            )}

            {/* 수정/저장 버튼 */}
            <Button 
              variant="black" 
              size="sm" 
              className="w-[80px]"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "저장" : "수정"}
            </Button>

          {/* 알림 영역: 아이콘 + 텍스트 + 알림 수 */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer">
            <div className="relative">
              <NotificationsIcon className="text-black w-[30px] h-[30px]" />
                
              {/* 알림 텍스트와 숫자가 가로로 이어짐 */}
              <div className="flex flex-row items-center gap-[4px] text-h4 font-medium">
                <span>알림</span>
                  {/* 알림 수가 있을 때만 숫자가 표시되도록 설정 */}
                  <span className="text-black">
                    {user?.unreadCount || 0}
                  </span>
              </div>
            </div>  
          </div>
        </div> 

        {/* 모바일 정보 그리드: 2열 배열 */}
        <div className="mo-infobox">
          <div className="mo-infoitem">
            <span className="infolabel">이름</span>
            <span className="infodata">{user?.name || "홍길동"}</span>
          </div>
          <div className="mo-infoitem">
            <span className="infolabel">이메일</span>
            <span className="infodata">{user?.email || "example@email.com"}</span>
          </div>
          <div className="mo-infoitem">
            <span className="infolabel">닉네임</span>
            <span className="infodata">{user?.nickname || "히나"}</span>
          </div>
          <div className="mo-infoitem">
            <span className="infolabel">가입일</span>
            <span className="infodata">2026.01.20</span>
          </div>
        </div>
      </div>
    );
  }

  return null; // 예외 처리
}