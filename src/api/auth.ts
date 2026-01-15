import { api } from 'src/api';

export interface LoginResponse {
  memberId: number;
  token: string;
}

export const login = async (email: string): Promise<LoginResponse> => {
  const formData = new URLSearchParams();
  formData.append('email', email);

  return api.post<LoginResponse>('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
