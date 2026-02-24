'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import QWERSection from '@/app/profile/QWERSection';
import ChodanSection from '@/app/profile/ChodanSection';
import MajentaSection from '@/app/profile/MajentaSection';
import HinaSection from '@/app/profile/HinaSection';
import SiyeonSection from '@/app/profile/SiyeonSection';
import { useDevice } from '@/hooks/useDevice';

export default function Profile() {
  const device = useDevice();
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState('QWER');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const menus = ['QWER', 'Chodan', 'Majenta', 'Hina', 'Siyeon'];

  // -------------------------------
  // Redirect 안정화 (logout / withdraw 후)
  // -------------------------------
  useEffect(() => {
    if (!shouldRedirect) return;

    const timer = setTimeout(() => {
      router.push('/');
      setShouldRedirect(false); // 상태 초기화
    }, 800);

    return () => clearTimeout(timer); // cleanup
  }, [shouldRedirect, router]);
  
  if (!device) return null; // hydration-safe

  // =========================
  // PC 버전
  // =========================
  if (device === 'pc') {
    return (
      <SideLayout num="01" title="Profile">
        <div className="flex">

          {/* TAB */}
          <div className="flex flex-col gap-[20px] text-bold cursor-pointer text-h3">
            {menus.map((menu) => (
              <div
                key={menu}
                className={`${activeMenu === menu ? 'active' : ''}`}
                onClick={() => setActiveMenu(menu)}
              >
                <span>{menu}</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="content-area">
            <div className="content-body">
              {activeMenu === 'QWER' && <QWERSection />}
              {activeMenu === 'Chodan' && <ChodanSection />}
              {activeMenu === 'Majenta' && <MajentaSection />}
              {activeMenu === 'Hina' && <HinaSection />}
              {activeMenu === 'Siyeon' && <SiyeonSection />}
            </div>
          </div>
        </div>

      </SideLayout>
    );
  }

  // =========================
  // MOBILE 버전
  // =========================
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">          

          {/* 탭 메뉴 */}
          <div className="flex flex-row items-center justify-between text-bold cursor-pointer text-h4">
            {menus.map((menu) => (
              <div
                key={menu}
                className={`${activeMenu === menu ? 'active' : ''}`}
                onClick={() => setActiveMenu(menu)}
              >
                <span>{menu}</span>
              </div>
            ))}
          </div>

          {/* 컨텐츠 */}
          <div className="content-area">
            <div className="content-body">
              {activeMenu === 'QWER' && <QWERSection />}
              {activeMenu === 'Chodan' && <ChodanSection />}
              {activeMenu === 'Majenta' && <MajentaSection />}
              {activeMenu === 'Hina' && <HinaSection />}
              {activeMenu === 'Siyeon' && <SiyeonSection />}
            </div>
          </div>
        </div>
      </main>
    );
  }
}