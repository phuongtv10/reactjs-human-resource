import { createSlice } from '@reduxjs/toolkit';
import { ICategoryRequest } from '../../redux/type';

interface ICategoryState {
  category: ICategoryRequest | null;
}

const initialState: ICategoryState = {
  category: null,
};

export const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {
  },
});

export default categorySlice.reducer;