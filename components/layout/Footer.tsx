'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import Select from '@/components/common/Select';
import { languageOptions } from '@/data/constants';
import { snsIcons } from '@/data/constants';
import { useDevice } from '@/hooks/useDevice';

export default function Footer() {
  const device = useDevice();
  const [expanded, setExpanded] = useState(false);

  const CompanyInfo = () => (
    <>
      <span className="info-item">회사명: (주)타마고프로덕션</span>               
      <span className="info-item">이메일: contact@qwer.com</span>
      <span className="info-item">사업자번호: 000-00-00000</span>
      <span className="info-item">주소: 서울특별시 강남구 어딘가</span>
    </>
  );

  // --- [PC 버전] ---
  if (device === "pc") {

    return (
      <footer className="footer-wrapper">
        <div className="footer-container">
          { /* Left Group */ }
          <div className="footer-left-group">

            { /* 1단 영역 */ }
            <div className="footer-content">
              <span className="content-text">QWER Official</span>
              <div className="footer-select-box relative">
                <Select 
                  device={device} 
                  options={languageOptions}
                  defaultValue="ko"
                  className="w-[140px]"
                />
              </div>
            </div>

            { /* 2단 영역 */ }
            <div className="footer-sns-list">
              {snsIcons.map((sns) => (
                <a 
                  key={sns.name} 
                  href={sns.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sns-icon relative"
                >
                  <Image 
                    src={sns.src} 
                    alt={sns.name} 
                    fill 
                    className="object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>

          { /* Right Group */ }
          <div className="footer-right-group">

            { /* 1단 영역 */ }
            <div className="footer-menu-list">
              <div className="menu-text-group">
                {/* 이용약관 */}
                <Link 
                  href={'/terms'} 
                >
                  이용약관
                </Link>

                {/* 개인정보 처리방침 (보통 볼드체로 강조합니다) */}
                <Link 
                  href={'/privacy'}
                >
                  개인정보 처리방침
                </Link>
              </div>
            </div>

            { /* 2단 영역 */ }
            <div className="footer-info-list">
              <CompanyInfo />
            </div>
          </div>          
        </div>

        { /* 구분선 */ }
          <div className="footer-divider"></div>

        { /* Copyright */ }
        <div className="footer-copyright">© 2026 QWER. ALL RIGHTS RESERVED.</div>
      </footer>
    )    
  }

  // --- [모바일 버전] ---
  if (device === "mo") {

    return (
      <footer className="footer-wrapper">
        <div className="footer-container">
          { /* Left Group */ }
          <div className="footer-left-group">

            { /* 1단 영역 */ }
            <div className="footer-content">
              <span className="content-text">QWER Official</span>
              <div className="footer-select-box relative">
                <Select 
                  device={device} 
                  options={languageOptions}
                  defaultValue="ko"
                  className="w-[100px]"
                />
              </div>
            </div>

            { /* 2단 영역 */ }
            <div className="footer-sns-list">
              {snsIcons.map((sns) => (
                <a 
                  key={sns.name} 
                  href={sns.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sns-icon relative"
                >
                  <Image 
                    src={sns.src} 
                    alt={sns.name} 
                    fill 
                    className="object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>

          { /* Right Group */ }
          <div className="footer-right-group">

            { /* 1단 영역 */ }
            <div className="footer-menu-list">
              <div className="menu-text-group">
                {/* 이용약관 */}
                <Link 
                  href={'/terms'} 
                >
                  이용약관
                </Link>

                {/* 개인정보 처리방침 (보통 볼드체로 강조합니다) */}
                <Link 
                  href={'/privacy'} 
                >
                  개인정보 처리방침
                </Link>
              </div>

              {/* 화살표 아이콘 */}
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="footer-toggle-btn"
                aria-expanded={expanded}
              >
                <ExpandMoreIcon
                  className={`icon-arrow ${
                    expanded ? 'rotate-180' : 'rotate-0'
                  }`}
                  sx={{ fontSize: 30, color: 'white' }}
                />
              </button>                          
            </div>
           
            { /* 2단 영역 */ }
            <div className="footer-info-list">
              <Collapse in={expanded} timeout="auto">
                <CompanyInfo />
              </Collapse>  
            </div>
          </div>
        </div>

        { /* 구분선 */ }
        <div className="footer-divider"></div>

        { /* Copyright */ }
        <div className="footer-copyright">© 2026 QWER. ALL RIGHTS RESERVED.</div>
      </footer>
    )    
  }
}