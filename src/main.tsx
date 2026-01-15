import ReactDOM from 'react-dom/client';
import App from 'src/App';
import AppProviders from 'src/providers';

import 'src/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
