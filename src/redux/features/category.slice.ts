import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    categoryState: (state, action: PayloadAction<ICategoryRequest>) => {
      state.category = action.payload;
      console.log('category',state.category);
    },
  },
});

export const { categoryState } = categorySlice.actions;
export default categorySlice.reducer;