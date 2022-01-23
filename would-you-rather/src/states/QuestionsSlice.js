/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions } from '../_DATA';

export const getQuestions = createAsyncThunk(
  'questions',
  async () => _getQuestions()
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
      questions: {},
      status: 'loading',
    },
    reducers: {
    //   setId: (state, action) => {
    //     state.user.id = action.payload;
    //   },
    },
    extraReducers: {
      [getQuestions.fulfilled]: (state, { payload }) => {
        console.log('Entered getQuestions!');
        state.questions = payload;
        console.log(state.questions);
      },
    }
});

//   export const { setId, logOut } = questionsSlice.actions;
  
  export const selectQuestions = (state) => state.questions.questions;
  
  export default questionsSlice.reducer;
  