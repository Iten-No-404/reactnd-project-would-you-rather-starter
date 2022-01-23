import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import questionsReducer from './QuestionsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionsReducer,
  },
});

export default store;
