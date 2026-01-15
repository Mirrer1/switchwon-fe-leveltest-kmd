import { FaWifi } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-8xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <FaWifi className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">Exchange app</span>
            </Link>

            <nav className="flex items-center gap-10">
              <Link
                to="/"
                className={`text-base font-semibold transition-colors ${
                  location.pathname === '/' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                환전 하기
              </Link>
              <Link
                to="/history"
                className={`text-base font-semibold transition-colors ${
                  location.pathname === '/history' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                환전 내역
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md active:scale-[0.98]"
              >
                Log out
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
