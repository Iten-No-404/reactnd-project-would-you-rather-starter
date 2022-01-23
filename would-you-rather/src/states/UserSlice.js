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
      // logIn: (state, action) => {
      //   console.log('Entered LogIn!');
      //   var userData = _getUsers();
      //   var id = action.payload;
      //   console.log('User id ='+ id);
      //   console.log(userData);
      //   state.user.loggedin = true;
      //   // state.user.email = action.payload;
      // },
      setId: (state, action) => {
        state.user.id = action.payload;
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

  export const { setId, logOut } = userSlice.actions;
  
  export const selectUser = (state) => state.user.user;
  
  export default userSlice.reducer;
  