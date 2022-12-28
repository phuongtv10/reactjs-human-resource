import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './config/ProtectedRoute';
import NotFoundPage from './pages/404';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><HomePage /></ProtectedRoute>
  },
  {
    path: '/*',
    element: <NotFoundPage />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
])



function App() {
  return <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
}

export default App;
