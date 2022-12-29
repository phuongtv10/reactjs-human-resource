import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth.api';
import authReducer from './features/auth.slice'

const API_MIDDLEWARE: any = [authApi.middleware];

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API_MIDDLEWARE)
})

export default store