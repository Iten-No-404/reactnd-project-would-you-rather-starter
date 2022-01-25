import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../_DATA';

export const logIn = createAsyncThunk(
  'login',
  async () => _getUsers()
);
export const getUsers = createAsyncThunk(
  'getUsers',
  async () => _getUsers()
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      allusers: {},
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
        // To sort users descendingly by sum of questions asked and answered:
        var usersHolder = {};
        Object.keys(payload).sort(function(a, b){
            return (payload[b].questions.length + Object.keys(payload[b].answers).length) - (payload[a].questions.length + Object.keys(payload[a].answers).length);
        }).forEach(function(key) {
            usersHolder[key] = payload[key];
        });        
        state.allusers = usersHolder;
        var userData = payload[state.user.id];
        console.log('User id ='+ state.user.id);
        console.log(userData);
        state.user.loggedin = true;
        state.user.name = userData.name;
        state.user.avatarURL = userData.avatarURL;
        state.user.questions = userData.questions;
        state.user.answers = userData.answers;
      },
      [getUsers.fulfilled]: (state, { payload }) => {
        // To sort users descendingly by sum of questions asked and answered:
        var usersHolder = {};
        Object.keys(payload).sort(function(a, b){
            return (payload[b].questions.length + Object.keys(payload[b].answers).length) - (payload[a].questions.length + Object.keys(payload[a].answers).length);
        }).forEach(function(key) {
            usersHolder[key] = payload[key];
        });        
        state.allusers = usersHolder;
      },
    }
});

  export const { setId, addAnswer, logOut } = userSlice.actions;
  
  export const selectUser = (state) => state.user.user;
  
  export const selectAllUsers = (state) => state.user.allusers;

  export default userSlice.reducer;
  