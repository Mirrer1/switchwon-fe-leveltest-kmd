import Home from 'src/pages/Home';
import Login from 'src/pages/Login';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login />, layout: 'none' },
];

export default routes;
