/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../_DATA';

export const logIn = createAsyncThunk(
  'login',
  async () => _getUsers()
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      allusers: [],
      user: {
        loggedin: false,
        id: 'sarahedo',
        name: '',
        avatarURL: '',
        questions: [],
        answers: {},
      },
      status: null,
    },
    reducers: {
      setId: (state, action) => {
        state.user.id = action.payload;
      },
      addAnswer: (state, action) => {
        state.user.answers = 
        {
          ...state.user.answers ,
          [action.payload.qid]: action.payload.answer
        }
      },
      logOut: (state) => {
        state.user = {
          loggedin: false,
          id: 'sarahedo',
          name: '',
          avatarURL: '',
          questions: [],
          answers: {},
        };
      },
    },
    extraReducers: {
      [logIn.fulfilled]: (state, { payload }) => {
        console.log('Entered LogIn!');
        state.allusers = payload;
        var userData = payload[state.user.id];
        console.log('User id ='+ state.user.id);
        console.log(userData);
        state.user.loggedin = true;
        state.user.name = userData.name;
        state.user.avatarURL = userData.avatarURL;
        state.user.questions = userData.questions;
        state.user.answers = userData.answers;
      },
    }
});

  export const { setId, addAnswer, logOut } = userSlice.actions;
  
  export const selectUser = (state) => state.user.user;
  
  export const selectAllUsers = (state) => state.user.allusers;

  export default userSlice.reducer;
  