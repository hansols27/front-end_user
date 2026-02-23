'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    isLoggedIn: boolean;
    provider: string; // naver, kakao, google
    name: string;
    email: string;
    nickname: string;
    profileImage: string; // 프로필 이미지 URL
    phoneNumber: string;  // 휴대폰 번호
    accessToken?: string;
  }

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  withdraw: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 초기 로드 시 로컬스토리지 확인
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const withdraw = async () => {
    try {
      /**
       * ✅ 여기에 실제 회원탈퇴 API 호출
       * 예시:
       * await api.delete('/users/me');
       */

      // 인증 정보 정리
      localStorage.removeItem('user');
      setUser(null);

    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      throw error; // UI에서 에러 처리 가능
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, withdraw  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};