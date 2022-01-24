import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GlobalStyles } from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPrompt from './LogIn';
import NotFound from './NotFound';
import { addAnswer, selectUser, selectAllUsers } from '../states/UserSlice';
import { getQuestions, answerQuestion, selectQuestions } from '../states/QuestionsSlice';
const theme = createTheme();

function PollResults() {
    const dispatch = useDispatch();
    const params = useParams();
    const user = useSelector(selectUser);
    const allUsers = useSelector(selectAllUsers);
    const questions = useSelector(selectQuestions);
    useEffect(() => {
        dispatch(getQuestions());
      }, [dispatch]);
    const questionid = params.question_id;
    // const optionOne = questions[questionid].optionOne;
    // const optionTwo = questions[questionid].optionTwo;
    // const totalVotes
    const [answered, setAnswered] = useState( Object.keys(user.answers).includes(questionid));
    const [answer, setAnswer] = useState('optionOne');
    console.log('Id = '+questionid);
    return ( 
        <ThemeProvider theme={theme}>
    { user.loggedin === false ? (
        <LogInPrompt />
      ) : (
        <Container  sx={{ width: 600 }}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: '#FFFFFF',
                height: '10%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              },
            }}
          />
        { Object.keys(questions).includes(questionid) === false  ? (
            <NotFound />
        ) : (
            <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
                    { answered === false ? (
              <Box
              sx={{
                  marginY: 2,
                  alignItems: 'center',
                  color: '#000000',
                  backgroundColor: '#00D7B3',
                  borderRadius: 2,
                  padding: 2,
                  width: '100%',
              }}
              >
            <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                { allUsers[questions[questionid].author].name + ' asks:'}
            </Typography>
            <Divider></Divider>
            <Box
              sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#FFFFFF',
              }}
              >
              <img width="150" height="150" alt="avatar" src={allUsers[questions[questionid].author].avatarURL} ></img>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
              <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 1,
                  }}
                  >
              <Typography component="h2" color="black" fontSize="1.8rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              Would you rather...
            </Typography>
            <FormControl>
                  <RadioGroup
                      defaultValue="optionOne"
                      name="would-you-rather-radio-buttons-group"
                      value={answer}
                  >
                      <FormControlLabel value="optionOne" control={<Radio onChange={ ()=> { setAnswer('optionOne')} }/>} 
                      label={  questions[questionid].optionOne.text} 
                      sx ={{color:"black", fontSize:"1rem", font:'"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'}} 
                      />
                      <FormControlLabel value="optionTwo" control={<Radio  onChange={ ()=> { setAnswer('optionTwo')} }/>} 
                      label={  questions[questionid].optionTwo.text} 
                      sx ={{color:"black", fontSize:"1rem", font:'"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'}} 
                      />
                  </RadioGroup>
              </FormControl>
        <Button
          fullWidth
          disableRipple
          variant="contained"
          size="large"
          font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
          style={{
              backgroundColor: '#FFFFFF', color: '#00D4FF', fontWeight: 'bold', textTransform: 'none',
          }}
          sx={{
              Mt: 1.5, mr: 1, ml: 1, mb: 1,
          }}
          type="submit"
          onClick={() => { 
              setAnswered(true);
              dispatch(answerQuestion({
                  authedUser: user.id,
                  qid: questionid,
                  answer: answer,
              }));
              dispatch(getQuestions());
              dispatch(addAnswer({
                  qid: questionid,
                  answer: answer,
              }));
           }}
          >
          Submit
        </Button>
      </Box>
      </Box>
      </Box>
          ) : (
              <Box
              sx={{
                  marginY: 2,
                  alignItems: 'center',
                  color: '#000000',
                  backgroundColor: '#00D7B3',
                  borderRadius: 2,
                  padding: 2,
                  width: '100%',
              }}
              >
            <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                {'Asked by: ' + allUsers[questions[questionid].author].name}
            </Typography>
            <Divider></Divider>
            <Box
              sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#FFFFFF',
              }}
              >
              <img width="150" height="150" alt="avatar" src={allUsers[questions[questionid].author].avatarURL} ></img>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
              <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 1,
                  }}
                  >
              <Typography component="h2" color="black" fontSize="1.8rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              Results
            </Typography>
              <Box
                  sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 1,
                  backgroundColor: questions[questionid].optionOne.votes.includes(user.id) ? "#EEEEEE" :'#FFFFFF',
                  borderRadius: 1.5,
                  padding: 2,
                  width: '100%',
                  }}
              >
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                { 'Would you rather ' + questions[questionid].optionOne.text + '?'}
                { questions[questionid].optionOne.votes.includes(user.id) && <CheckIcon/>}
              </Typography>
              <CircularProgressWithLabel sx={{display: 'block'}} value={(questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length === 0) ? 50 : (questions[questionid].optionOne.votes.length * 100 / (questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length))} />
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ m: 1}}>
                { questions[questionid].optionOne.votes.length + ' out of ' + (questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length) + ' votes'}
              </Typography>
              </Box>
              <Box
                  sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 1,
                  backgroundColor: questions[questionid].optionTwo.votes.includes(user.id) ? '#EEEEEE': '#FFFFFF',
                  borderRadius: 1.5,
                  padding: 2,
                  width: '100%',
                  }}
              >
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                { 'Would you rather ' + questions[questionid].optionTwo.text + '?'}
                { questions[questionid].optionTwo.votes.includes(user.id) && <CheckIcon/>}
              </Typography>
              <CircularProgressWithLabel sx={{display: 'block'}} value={(questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length === 0) ? 50 : (questions[questionid].optionTwo.votes.length * 100 / (questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length))} />
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ m: 1}}>
                { questions[questionid].optionTwo.votes.length + ' out of ' + (questions[questionid].optionOne.votes.length + questions[questionid].optionTwo.votes.length) + ' votes'}
              </Typography>
              </Box>
      </Box>
      </Box>
      </Box>
              ) }
          </Box>
        )}
        </Container>
      )
      }
      </ThemeProvider>
     );
}

PollResults.propTypes = {
    answered: PropTypes.bool,
};

PollResults.defaultProps = {
    answered: false,
};

export default PollResults;

function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
}