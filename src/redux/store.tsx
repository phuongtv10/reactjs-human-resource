import { configureStore } from '@reduxjs/toolkit';


const API_MIDDLEWARE: any = [];

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API_MIDDLEWARE)
})

export default store