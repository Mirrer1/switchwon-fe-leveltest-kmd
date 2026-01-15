import { useMutation } from '@tanstack/react-query';
import { login, type LoginResponse } from 'src/api/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (email: string) => login(email),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.token);
    },
    onError: () => {
      console.error('로그인에 실패했습니다.');
    },
  });
};
