import { createSlice } from '@reduxjs/toolkit';
import { IEvaluationRequest } from '../type';

interface IEvaluationState {
  data: IEvaluationRequest | null;
}

const initialState: IEvaluationState = {
  data: null,
};

export const evaluationSlice = createSlice({
  initialState,
  name: 'evaluation',
  reducers: {
    getEvaluationFormById: (state,action): IEvaluationState => {
      const {data} = action.payload;
      return {
        ...state,
        data,
      }
    },
    createMarkCheckoint: (state,action): IEvaluationState => {
      const {data} = action.payload;
      return {
        ...state,
        data,
      }
    },
  },
});

export const {createMarkCheckoint: createMarkCheckointAction, getEvaluationFormById: getEvaluationFormByIdAction} = evaluationSlice.actions

export default evaluationSlice.reducer;