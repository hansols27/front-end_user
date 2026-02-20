'use client';

import { useState } from 'react';
import UserInfo from '@/components/common/UserInfo';
import Button from '../common/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDevice } from '@/hooks/useDevice';

interface MyInfoSectionProps {
  user: any;
}

export default function MyInfoSection({ user }: MyInfoSectionProps) {
  const device = useDevice();
  const [tempNickname, setTempNickname] = useState(user?.nickname || "Guest");

  if (!device) return null;

  // --- [PC 버전 전용 리턴] ---
  if (device === "pc") {
    return (
      <div className="flex flex-col w-full gap-[40px]">
        {/* 상단 영역: 프로필+수정부와 알림부를 양 끝으로 배치 */}
        <div className="flex flex-row items-center justify-between w-full">
          
          {/* 왼쪽: 프로필 정보 + 수정 버튼 가로 배열 */}
          <div className="flex flex-row items-center gap-[20px]">
            <UserInfo
              type="row"
              size="mypage-pc"
              nickname=""
              profileSrc={user?.profileImage}
              isEdit={true} 
            />

            {/* 수정 모드일 때 나타나는 입력 필드와 버튼을 가로로 묶음 */}
            <div className="flex flex-row items-center gap-[10px]">
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-transparent border-b border-black outline-none text-h3 font-bold pb-1 w-[140px]"
              />
              <Button 
                variant="black" 
                size="sm" 
                className="w-[80px]"                
              >
                저장
              </Button>
            </div>
          </div>

          {/* 오른쪽: 알림 영역 아이콘 + 텍스트 가로 배열 */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer">
            <NotificationsIcon className="text-black w-[30px] h-[30px]" />
            <div className="flex flex-row items-center gap-[5px] text-h4 font-medium">
              <span>알림</span>
              <span className="font-bold">{user?.unreadCount || 0}</span>
            </div>
          </div>
        </div>

        {/* PC 정보 그리드 */}
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
            <span className="infolabel">휴대폰번호</span>
            <span className="infodata">{user?.phoneNumber || "010-1234-5678"}</span>
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
      <div className="flex flex-col w-full gap-[30px]">
        {/* 모바일 상단: 세로가 아닌 가로로 배치 (공간 확보) */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-[15px]">
            <UserInfo
              type="row"
              size="mypage-mo"
              nickname=""
              profileSrc={user?.profileImage}
              isEdit={true}
            />
            <div className="flex flex-row items-center gap-[10px]">
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-transparent border-b border-black outline-none text-h5 font-bold w-[100px]"
                autoFocus
              />
              
              <Button 
                variant="black" 
                size="sm" 
                className="w-[60px]"
              >
                저장
              </Button>
            </div>
          </div>

          {/* 모바일 알림부 */}
          <div className="flex flex-row items-center gap-[5px]">
            <NotificationsIcon className="text-black w-[20px] h-[20px]" />
            <div className="flex flex-row items-center gap-[5px] text-h5">
              <span>알림</span>
              <span>{user?.unreadCount || 0}</span>
            </div>
          </div>
        </div>

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
            <span className="infolabel">휴대폰번호</span>
            <span className="infodata">{user?.phoneNumber || "010-1234-5678"}</span>
          </div>
          <div className="mo-infoitem">
            <span className="infolabel">가입일</span>
            <span className="infodata">2026.01.20</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}