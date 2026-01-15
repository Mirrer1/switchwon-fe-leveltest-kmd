import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  // 로그인 페이지인데 이미 토큰 있으면 홈으로
  if (location.pathname === '/login') {
    if (token) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  // 로그인 페이지 아닌데 토큰 없으면 로그인으로
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthProvider;
