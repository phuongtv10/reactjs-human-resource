import { createSlice } from '@reduxjs/toolkit';


interface AuthState {
  data: null | any,
  authenticated: boolean
}

const initialState: AuthState = {
  data: null,
  authenticated: false
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    login: (state,action): AuthState => {
      const {data} = action.payload

      return {
        ...state,
        data,
        authenticated: true
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