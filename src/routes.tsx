import Exchange from 'src/pages/Exchange';
import Login from 'src/pages/Login';

const routes = [
  { path: '/', element: <Exchange /> },
  { path: '/login', element: <Login />, layout: 'none' },
];

export default routes;
