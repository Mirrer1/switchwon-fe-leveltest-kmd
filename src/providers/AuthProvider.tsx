import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  // 로그인 상태에서 로그인 페이지 접근 시 홈으로 리다이렉트
  if (location.pathname === '/login') {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  // 비로그인 상태에서 보호 페이지 접근 시 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
