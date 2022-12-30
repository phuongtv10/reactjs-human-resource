import { createSlice } from '@reduxjs/toolkit';


interface AuthState {
  data: null | any,
}

const initialState: AuthState = {
    data: {},
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