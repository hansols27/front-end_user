'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TermsSection from '@/components/section/TermsSection';
import { socialLogins } from '@/data/constants';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<'select' | 'terms'>('select');
  const [selectedSocial, setSelectedSocial] = useState<any>(null);
  
  const handleSelectSocial = (social: any) => {
    setSelectedSocial(social);
    setStep('terms');
  };

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
    <main className="min-h-screen w-full bg-white flex items-center justify-center px-[35px] lg:px-0">
      <section className="w-full max-w-[480px]">

        {step === 'select' ? (
          /* STEP 1: 소셜 선택 */
          <div className="flex flex-col gap-[20px]">
            {socialLogins.map((social) => (
              <button
                key={social.name}
                className={`btn-social ${social.className}`}
                onClick={() => handleSelectSocial(social)}
              >
                <div className="relative w-5 h-5 mr-2">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    fill
                    className="object-contain"
                  />
                </div>
                {social.name}로 시작하기
              </button>
            ))}
          </div>
        ) : (
          /* STEP 2: 약관 동의 */
          <TermsSection
            onComplete={handleFinalJoin}
            onBack={() => {
              setStep('select');
              setSelectedSocial(null);
            }}
          />
        )}

      </section>
    </main>
  );
}