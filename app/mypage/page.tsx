'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserInfo from '@/components/common/UserInfo';
import Tab from '@/components/common/Tab';
import ConfirmAlert from '@/components/common/ConfirmAlert';
import Button from '@/components/common/Button'; 
import SideLayout from '@/components/layout/SideLayout'; 
import MyInfoSection from '@/components/section/MyInfoSection'
import MyPostsSection from '@/components/section/MyPostsSection';
import MyCommentsSection from '@/components/section/MyCommentsSection';


export default function MyPage({ device = "pc" }: { device?: "pc" | "mo" }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('내 정보');
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const menus = ['내 정보', '내가 쓴 글', '내가 쓴 댓글'];  

  // 메뉴 매핑 객체
  const menuComponents: Record<string, (device: "pc" | "mo") => React.ReactNode> = {
    '내 정보': (device) => <MyInfoSection user={user} device={device} />,
    '내가 쓴 글': (device) => <MyPostsSection device={device} />,
    '내가 쓴 댓글': (device) => <MyCommentsSection device={device} />, 
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutAlertOpen(false);
    router.push("/");
  };

  const renderContent = () => {
    const Component = menuComponents[activeMenu];
    return Component ? Component(device) : null;
  };

  // --- [PC 버전] ---
  if (device === "pc") {
    return (
      <SideLayout num="08" title="My page">
        <div className="pc-content gap-[40px]">
          <nav className="lnb-wrapper">            
            <UserInfo
              type="col"
              size="mypage"
              nickname={user?.nickname || "Guest"}
              profileSrc={user?.profileImage || "/images/default-profile.png"}
            />    

            <div className="lnb-menu-list">
              {menus.map((menu) => (
                <div 
                  key={menu} 
                  className={`lnb-item ${activeMenu === menu ? 'active' : ''}`}
                  onClick={() => setActiveMenu(menu)}
                >
                  <span>{menu}</span>
                  <ChevronRightIcon className="icon-arrow" />
                </div>
              ))}
            </div>

            <div className="lnb-footer">
              <Button 
                variant="black" 
                size="md" 
                className="w-full" 
                onClick={() => setIsLogoutAlertOpen(true)}
              >
                로그아웃
              </Button> 
              <Button 
                variant="black" 
                size="md" 
                className="w-full"
              >
                회원탈퇴
              </Button>
            </div>
          </nav>

          <div className="mypage-content-area">
            <div className="content-title">{activeMenu}</div>
            <div className="content-body">
              {renderContent()}
            </div>
          </div>
        </div>

        <ConfirmAlert
          device="pc"
          type="logout"
          isOpen={isLogoutAlertOpen}
          onConfirm={handleLogoutConfirm}
          onCancel={() => setIsLogoutAlertOpen(false)}
        />        
      </SideLayout>
    );
  }

  // --- [모바일 버전] ---
  if (device === "mo") {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">          
          <UserInfo
            type="col"
            size="mypage"
            nickname={user?.nickname || "Guest"}
            profileSrc={user?.profileImage || "/images/default-profile.png"}
          />  
          
          <div className="flex flex-col gap-[10px]">
            {menus.map((menu) => (
              <Tab
                key={menu}
                label={menu}
                variant="box"      
                device="mo"        
                isActive={activeMenu === menu}
                onClick={() => setActiveMenu(menu)}
                className="flex-1" 
              />
            ))}
          </div>

          <div className="flex-1 mt-[30px]">
             {renderContent()} 
          </div>

          <div className="mo-content-footer">
            <Button 
              variant="black" 
              size="md" 
              className="w-full" 
              onClick={() => setIsLogoutAlertOpen(true)}
            >
              로그아웃
            </Button> 
            <Button 
              variant="black" 
              size="md" 
              className="w-full"
            >
              회원탈퇴
            </Button>
          </div>

          <ConfirmAlert
            device="mo"
            type="logout"
            isOpen={isLogoutAlertOpen}
            onConfirm={handleLogoutConfirm}
            onCancel={() => setIsLogoutAlertOpen(false)}
          />
        </div>
      </main>
    );
  }

}