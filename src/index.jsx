import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { theme } from './chakra';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './api/UserContext';
import ChatContextClass from './api/ChatContext';
import ContextClass from './api/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextClass>
    <UserProvider>
      <ChatContextClass>
        <React.StrictMode>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode='dark'/>
            <ToastContainer/>
            <App />
          </ChakraProvider>
        </React.StrictMode>
      </ChatContextClass>
    </UserProvider>
  </ContextClass>
);
// serviceWorkerRegistration.register();