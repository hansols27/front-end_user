'use client';

import { useState, ReactNode  } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserInfo from '@/components/common/UserInfo';
import Tab from '@/components/common/Tab';
import ConfirmAlert from '@/components/common/ConfirmAlert';
import Button from '@/components/common/Button';
import SideLayout from '@/components/layout/SideLayout';
import MyInfoSection from '@/components/section/MyInfoSection';
import MyPostsSection from '@/components/section/MyPostsSection';
import MyCommentsSection from '@/components/section/MyCommentsSection';
import { useDevice } from '@/hooks/useDevice';

export default function MyPage() {
  const device = useDevice();
  const { user, logout, withdraw } = useAuth();
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState('내 정보');
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [isDrawAlertOpen, setIsDrawAlertOpen] = useState(false);

  if (!device) return null; // hydration-safe

  const menus = ['내 정보', '내가 쓴 글', '내가 쓴 댓글'];

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutAlertOpen(false);
    router.push('/');
  };

  const handleDrawConfirm = () => {
    withdraw();
    setIsDrawAlertOpen(false);
    router.push('/');
  };

  /* =========================
     PC
  ========================= */
  if (device === 'pc') {
    return (
      <SideLayout num="08" title="My page">
        <div className="flex">
          {/* LNB */}
          <nav className="lnb-wrapper">
            <UserInfo
              type="col"
              size="mypage"
              nickname={user?.nickname || 'Guest'}
              profileSrc={user?.profileImage || '/images/default-profile.png'}
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
                onClick={() => setIsDrawAlertOpen(true)}
            >
              회원탈퇴
            </Button>
            </div>
          </nav>

          {/* Content */}
          <div className="mypage-content-area">
            <div className="content-title">{activeMenu}</div>
            <div className="content-body">
              {activeMenu === '내 정보' && <MyInfoSection user={user} />}
              {activeMenu === '내가 쓴 글' && <MyPostsSection />}
              {activeMenu === '내가 쓴 댓글' && <MyCommentsSection />}
            </div>
          </div>
        </div>

        <ConfirmAlert
          device={device}
          type="logout"
          isOpen={isLogoutAlertOpen}
          onConfirm={handleLogoutConfirm}
          onCancel={() => setIsLogoutAlertOpen(false)}
        />

        <ConfirmAlert
            device={device}
            type="withdraw"
            isOpen={isDrawAlertOpen}
            onConfirm={handleDrawConfirm}
            onCancel={() => setIsDrawAlertOpen(false)}
          />
      </SideLayout>
    );
  }

  /* =========================
     MOBILE
  ========================= */
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">
          <UserInfo
            type="col"
            size="mypage"
            nickname={user?.nickname || 'Guest'}
            profileSrc={user?.profileImage || '/images/default-profile.png'}
          />

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
              onClick={() => setIsDrawAlertOpen(true)}
            >
              회원탈퇴
            </Button>
          </div>

          <div className="flex flex-row gap-[10px] pt-[20px]">
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
            {activeMenu === '내 정보' && <MyInfoSection user={user} />}
            {activeMenu === '내가 쓴 글' && <MyPostsSection />}
            {activeMenu === '내가 쓴 댓글' && <MyCommentsSection />}
          </div>          

          <ConfirmAlert
            device="pc"
            type="logout"
            isOpen={isLogoutAlertOpen}
            onConfirm={handleLogoutConfirm}
            onCancel={() => setIsLogoutAlertOpen(false)}
          />

          <ConfirmAlert
            device="pc"
            type="withdraw"
            isOpen={isDrawAlertOpen}
            onConfirm={handleDrawConfirm}
            onCancel={() => setIsDrawAlertOpen(false)}
          />
        </div>
      </main>
    );
  }
}