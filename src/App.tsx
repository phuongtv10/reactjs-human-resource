import React from 'react';
import { Provider } from 'react-redux';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import NotFoundPage from './pages/404';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePage />
  },
  {
    path: '/*',
    element: <NotFoundPage />
  },
  {
    path:'/dashboard',
    element: <Dashboard />
  },
  {
    path:'/auth',
    element: <AuthPage />
  }
])

function App() {
  return <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
}

export default App;
