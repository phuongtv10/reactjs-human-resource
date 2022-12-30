import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import AuthPage from './pages/Auth';
import Guard from './pages/Guard';
import store from './redux/store';
import {CookiesProvider,Cookies} from 'react-cookie'
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';


type IAppProps = {
	cookies?: string;
};

function App({cookies}: IAppProps) {

	const isServer = typeof window === 'undefined';
  
  return <CookiesProvider cookies={isServer ? new Cookies(cookies) : undefined}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Guard />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/*' element={<Navigate to="/"  />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
}

export default App;
