/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestionAnswer } from '../_DATA';

export const getQuestions = createAsyncThunk(
  'questions',
  async () => _getQuestions()
);

export const answerQuestion = createAsyncThunk(
  'answer-question',
  async (query) => _saveQuestionAnswer(query)
);

const questionsSlice = createSlice({
    name: 'question',
    initialState: {
      questions: {},
      status: 'loading',
      answer: '',
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
      [answerQuestion.fulfilled]: (state, { payload }) => {
        console.log('Entered answerQuestion!');
        state.answer = '';
      },
    }
});

//   export const { setId, logOut } = questionsSlice.actions;
  
  export const selectQuestions = (state) => state.questions.questions;
  
  export default questionsSlice.reducer;
  