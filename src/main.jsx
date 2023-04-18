import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import App from './App';

import './styles/main.scss';
import { TodoProvider } from './context/TodoProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TodoProvider>,
);
