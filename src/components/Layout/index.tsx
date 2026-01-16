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
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200 shrink-0">
        <div className="px-4 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <FaWifi className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">Exchange app</span>
            </Link>

            <nav className="flex items-center gap-8">
              <Link
                to="/"
                className={`text-base font-medium transition-colors ${
                  location.pathname === '/' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                환전 하기
              </Link>
              <Link
                to="/history"
                className={`text-base font-medium transition-colors ${
                  location.pathname === '/history' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                환전 내역
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-md active:scale-[0.98]"
              >
                Log out
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="h-full px-12 py-8 mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
