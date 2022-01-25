import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

export const getQuestions = createAsyncThunk(
  'questions',
  async () => _getQuestions()
);

export const saveQuestion = createAsyncThunk(
  'save-question',
  async (query) => _saveQuestion(query)
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
      questionAddedid: '',
    },
    reducers: {
      resetAddedId: (state) => {
        state.questionAddedid = '';
      },
    },
    extraReducers: {
      [getQuestions.fulfilled]: (state, { payload }) => {
        console.log('Entered getQuestions!');
        // To sort questions descendingly by timestamp:
        var questionsholder = {};
        Object.keys(payload).sort(function(a, b){
            return payload[b].timestamp - payload[a].timestamp;
        }).forEach(function(key) {
            questionsholder[key] = payload[key];
        });
        state.questions = questionsholder;
        console.log(state.questions);
        console.log(Object.keys(state.questions));
      },
      [saveQuestion.fulfilled]: (state, { payload }) => {
        console.log('Entered saveQuestion!');
        state.questionAddedid = payload.id;
      },
      [answerQuestion.fulfilled]: (state, { payload }) => {
        console.log('Entered answerQuestion!');
        state.answer = '';
      },
    }
});

export const { resetAddedId } = questionsSlice.actions;

export const selectQuestions = (state) => state.questions.questions;

export const selectAddedQuestionId = (state) => state.questions.questionAddedid;

export default questionsSlice.reducer;
  