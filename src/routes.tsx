import Exchange from 'src/pages/Exchange';
import History from 'src/pages/History';
import Login from 'src/pages/Login';

const routes = [
  { path: '/', element: <Exchange /> },
  { path: '/history', element: <History /> },
  { path: '/login', element: <Login />, layout: 'none' },
];

export default routes;
