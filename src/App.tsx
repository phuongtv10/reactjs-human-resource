import React from 'react';
import { Provider } from 'react-redux';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import NotFoundPage from './pages/404';
import AuthPage from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import store from './redux/store';
import {CookiesProvider,Cookies} from 'react-cookie'

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

type IAppProps = {
	cookies?: string;
};
function App({cookies}: IAppProps) {

	const isServer = typeof window === 'undefined';
  
  return <CookiesProvider cookies={isServer ? new Cookies(cookies) : undefined}>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </CookiesProvider>
}

export default App;
