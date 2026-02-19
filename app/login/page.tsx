'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TermsSection from '@/components/section/TermsSection';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // step: 소셜 선택('select') 또는 약관 동의('terms')
  const [step, setStep] = useState<'select' | 'terms'>('select');
  const [selectedSocial, setSelectedSocial] = useState<any>(null);

  const socialLogins = [
    { 
      name: '네이버', 
      className: 'btn-naver', 
      icon: '/icons/naver.svg', 
      provider: 'naver', 
      userName: '김네이버', 
      email: 'naver_user@naver.com', 
      nickname: '네이버팬', 
      phoneNumber: '010-1234-5678', 
      profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
    },
    { 
      name: '카카오', 
      className: 'btn-kakao', 
      icon: '/icons/kakao.svg', 
      provider: 'kakao', 
      userName: '이카카오', 
      email: 'kakao_user@kakao.com', 
      nickname: '카카오친구', 
      phoneNumber: '010-8765-4321', 
      profileImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png' 
    },
    { 
      name: '구글', 
      className: 'btn-google', 
      icon: '/icons/google.svg', 
      provider: 'google', 
      userName: '박구글', 
      email: 'google_user@gmail.com', 
      nickname: '구글유저', 
      phoneNumber: '010-5555-4444', 
      profileImage: 'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398782_1280.png' 
    },
  ];

  // 소셜 버튼 클릭 시 호출
  const handleSelectSocial = (social: any) => {
    setSelectedSocial(social);
    setStep('terms'); // 약관 동의 단계로 전환
  };

  // TermsSection에서 '가입 완료' 클릭 시 호출될 최종 로그인 로직
  const handleFinalJoin = () => {
    if (!selectedSocial) return;
    login({
      isLoggedIn: true,
      provider: selectedSocial.provider,
      name: selectedSocial.userName,
      email: selectedSocial.email,
      nickname: selectedSocial.nickname,
      phoneNumber: selectedSocial.phoneNumber,
      profileImage: selectedSocial.profileImage,
      accessToken: `mock-token-${selectedSocial.provider}`,
    });
    router.push('/');
  };

  return (
    /* 타이틀 없는 레이아웃 타입 적용 */
    <main className="sub-page-layout layout-no-title">
      <section className="sub-content">
        
        {step === 'select' ? (
          /* [STEP 1] 소셜 로그인 선택 */
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-[20px] w-full max-w-[480px]">
              {socialLogins.map((social) => (
                <button
                  key={social.name}
                  className={`btn-social ${social.className}`}
                  onClick={() => handleSelectSocial(social)}
                >
                  <div className="relative w-5 h-5 mr-2">
                    <Image src={social.icon} alt={social.name} fill className="object-contain" />
                  </div>
                  {social.name}로 시작하기
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* [STEP 2] 약관 동의 컴포넌트 사용 */
          <TermsSection 
            onComplete={handleFinalJoin} 
            onBack={() => {
              setStep('select');
              selectedSocial(null);
            }}             
          />
        )}

      </section>
    </main>
  );
}