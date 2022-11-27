import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import App from './App';
import { Theme } from './styles/theme';
import { NotifyProvider } from './hooks/notifier/use-notify';
import Notifier from './components/notifier';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ThemeProvider theme={Theme}>
          <NotifyProvider Component={Notifier}>
            <App />
          </NotifyProvider>
        </ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
