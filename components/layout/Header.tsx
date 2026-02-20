'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@/components/common/Button";
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserInfo from "@/components/common/UserInfo";
import ConfirmAlert from '@/components/common/ConfirmAlert';
import { menuItems } from '@/data/constants';
import { useDevice } from '@/hooks/useDevice';

export default function Header() {
  const device = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true); 
  }, []);

  const currentMenu = menuItems.find(item => item.path === pathname)?.name || 'Home';
  if (!mounted) return null;
  const isLoggedIn = !!user;

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutAlertOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  // --- [PC 버전] ---
  if (device === "pc") {    

    return (
      <>
      <header className="header-wrapper">
        {/* 1. 로고 영역 */}
        <div className="header-logo" onClick={() => router.push('/')}>
           <Image 
            src="/logo.svg" 
            alt="QWER Logo" 
            fill 
            priority
          />
        </div>

        {/* 2. 메뉴 영역 */}
        <nav className="header-pc-menu" >
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* 3. 버튼 영역 (로그인 여부에 따라 분기) */}
        <div className="header-pc-right relative">          
          { !isLoggedIn ? (
          /* 1. 비로그인 상태 (isLoggedIn이 false일 때) */
          <Button 
            variant="blue" 
            size="md" 
            className="w-[140px]" 
            onClick={() => router.push('/login')}
            >
            로그인
          </Button>             
          ) : (
            /* 2. 로그인 상태 (isLoggedIn이 true일 때) */
            <div className="flex items-center gap-[10px] justify-end">
              <UserInfo
                type="row"
                size="header"
                nickname={user?.nickname || "Guest"}
                profileSrc={user?.profileImage || "/images/default-profile.png"}
              />
              {/* 화살표 아이콘 */}
              <div 
                className={`icon-arrow  transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <ExpandMoreIcon sx={{ fontSize: 30, color: 'white' }} />
              </div>
            </div>            
          )}        

          {isMenuOpen && (
          <div className="more-menu">
            {/* 마이페이지 아이템 */}
            <div 
              className="menu-item" 
              onClick={() => {
                router.push('/mypage');
                setIsMenuOpen(false);  
              }} 
            >
              마이페이지
            </div>           
            
            {/* 로그아웃 아이템 */}
            <div className="menu-item logout" onClick={() => setIsLogoutAlertOpen(true)}>
              로그아웃
            </div>
          </div>
        )}             
        </div>        
      </header>

      {/* 2. 알럿 컴포넌트 */}
      <ConfirmAlert
        device={device}
        type="logout"
        isOpen={isLogoutAlertOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutAlertOpen(false)}
      />
    </>
    );
  }

  // --- [모바일 버전] ---
  if (device === "mo") {

    return (
      <>
        <header className="header-wrapper">
          {/* 1. Logo */}
          <div 
            className="header-logo" 
            onClick={() => router.push('/')}
            >
            <Image 
              src="/logo.svg" 
              alt="QWER Logo" 
              fill 
              priority 
            />
          </div>
  
          {/* 2. Menu Title (현재 위치 표시) */}
          <div className="header-mobile-menu">
            {currentMenu}
          </div> 
  
          {/* 3. Hamburger Menu Button */}
          <div className="icon-hamburger">
            <button 
              onClick={() => setIsMenuOpen(true)}
              >
              <MenuIcon 
                sx={{ fontSize: 30, color: 'white' }} 
              />
            </button>
          </div>
        </header>
  
        {/* 모바일 전체화면 메뉴 오버레이 */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay">
            {/* [1단] 상단 헤더 영역 */}
            <div className="menu-header">
              <div className="menu-title">메뉴</div>
              <div className="icon-close">
                <button onClick={() => setIsMenuOpen(false)}>
                  <CloseIcon sx={{ fontSize: 30, color: 'white' }} />
                </button>
              </div>
            </div>
  
            {/* [2단] 로그인 가이드/유저 정보 박스 */}
            <div className="menu-guide-box">
              {!isLoggedIn ? (
                /* --- 비로그인 상태 --- */
                <>
                  <div className="guide-text">
                    <p>
                      커뮤니티를 이용 하시려면<br />
                      로그인이 필요 합니다!
                    </p>
                  </div>
                  <div className="login-btn">
                    <Button 
                      variant="blue" 
                      size="md" 
                      className="w-full"
                      onClick={() => {
                        router.push('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      로그인
                    </Button>
                  </div>
                </>
              ) : (
                /* --- 로그인 상태 --- */
                <>
                  <div className="flex items-center justify-between w-full">
                    <UserInfo
                      type="row"
                      size="header"
                      nickname={user?.nickname || "Guest"}
                      profileSrc={user?.profileImage || "/images/default-profile.png"}
                    />
                    {/* 화살표 아이콘 */}
                    <div 
                      className="icon-arrow" 
                      onClick={() => { router.push('/mypage'); setIsMenuOpen(false);                         
                      }}
                      > 
                      <ChevronRightIcon 
                        sx={{ 
                          fontSize: 30, 
                          color: 'white'                           
                        }} 
                      /> 
                    </div>
                  </div> 
                  <div className="login-btn logout">
                    <Button 
                      variant="blue" 
                      size="md" 
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false); 
                        setIsLogoutAlertOpen(true); 
                      }}
                    >
                      로그아웃
                    </Button>
                </div> 
                </>                
              )}
            </div>
  
            {/* [3단] 메뉴 리스트 영역 */}
            <nav className="menu-list-wrapper">
              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
  
        {/* 알럿 컴포넌트 (디바이스 속성을 "mo"로 변경) */}
        <ConfirmAlert
          device={device}
          type="logout"
          isOpen={isLogoutAlertOpen}
          onConfirm={handleLogoutConfirm}
          onCancel={() => setIsLogoutAlertOpen(false)}
        />
      </>
    );
  }
}  