import { token } from './../../core/theme/index';
import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';


interface AuthState {
  token: any;
  data: null | any,
  authenticated: boolean
}

const initialState: AuthState = {
  data: null,
  authenticated: false,
  token: undefined
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    login: (state,action): AuthState => {
      const {data} = action.payload;

      return {
        ...state,
        data,
        authenticated: true,
        token: data.token
      }
    },
    logout: (state): AuthState => {

      return {
        ...state,
        data: null,
      }
    }
  }
})

export const {login: loginAction,logout: logoutAction} = authSlice.actions

export default authSlice.reducer