import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    defaultRoute: '/',
    currentRoute: '',
}

const authSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {}
})

export default authSlice.reducer