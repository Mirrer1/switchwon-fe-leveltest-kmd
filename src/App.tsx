import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from 'src/components/Layout';
import routes from 'src/routes';

const layouts: Record<string, React.ComponentType<{ children: React.ReactNode }>> = {
  main: AppLayout,
  none: ({ children }) => <>{children}</>,
};

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, element, layout = 'main' }) => (
        <Route key={path} path={path} element={React.createElement(layouts[layout], { children: element })} />
      ))}
    </Routes>
  );
};

export default App;
