import { useState } from 'react';
import { FaWifi } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'src/queries/auth';

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync(email);
      navigate('/');
    } catch {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full">
            <FaWifi className="h-full w-full text-blue-500" />
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-900">반갑습니다.</h1>
        <p className="mb-10 text-xl text-gray-600">로그인 정보를 입력해주세요.</p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-left">
              <label htmlFor="email" className="mb-4 block text-sm text-gray-600">
                이메일 주소를 입력해주세요.
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="test@test.com"
                className="w-full rounded-md border border-gray-700 bg-white px-4 py-3 text-sm transition-all duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg active:scale-[0.98]"
            >
              로그인 하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
