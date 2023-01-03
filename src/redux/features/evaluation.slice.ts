import { createSlice } from '@reduxjs/toolkit';
import { IEvaluationRequest } from '../type';

interface IEvaluationState {
  evaluation: IEvaluationRequest | null;
}

const initialState: IEvaluationState = {
  evaluation: null,
};

export const evaluationSlice = createSlice({
  initialState,
  name: 'evaluation',
  reducers: {
  },
});

export default evaluationSlice.reducer;