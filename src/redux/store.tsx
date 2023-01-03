import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/auth.api';
import { evaluationApi } from '../api/evaluation.api';
import authReducer from './features/auth.slice';
import evaluationReducer from './features/evaluation.slice';

const API_MIDDLEWARE: any = [authApi.middleware];

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    // Connect the PostApi reducer to the store
    [evaluationApi.reducerPath]: evaluationApi.reducer,
    evaluation: evaluationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API_MIDDLEWARE)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;