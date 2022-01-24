import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPrompt from './LogIn';
import { logIn, selectUser, selectAllUsers } from '../states/UserSlice';
import { getQuestions, selectQuestions } from '../states/QuestionsSlice';
const theme = createTheme();


function Home() {
    const [showAnswered, setShowAnswered] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const allUsers = useSelector(selectAllUsers);
    const questions = useSelector(selectQuestions);
    useEffect(() => {
      dispatch(getQuestions());
      dispatch(logIn());
    }, [dispatch]);
    useEffect(() => {
      if(user.loggedin === false){
        setShowAnswered(false);
      }
    }, [user.loggedin]);
    return ( 
    <ThemeProvider theme={theme}>
      { user.loggedin === false ? (
        <LogInPrompt />
      ) : 
      (
        <Container sx={{ width: 600 }} >
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: '#FFFFFF',
              height: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            },
          }}
        />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF',
          }}
        >
          <ButtonGroup 
          fullWidth
          >
            <Button
                      disableRipple
                      variant="contained"
                      size="large"
                      font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
                      style={{
                      backgroundColor: '#EEEEEE', color: showAnswered ? '#000000' :'#00b8ff', fontWeight: 'bold', textTransform: 'none',
                      }}
                      sx={{
                      spacing: 8, width: 300
                      }}
                      onClick={() => { setShowAnswered(false) }}
            >Unanswered Questions</Button>
            <Button
                      disableRipple
                      variant="contained"
                      size="large"
                      font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
                      style={{
                      backgroundColor: '#EEEEEE', color: showAnswered ? '#00b8ff': '#000000' , fontWeight: 'bold', textTransform: 'none',
                      }}
                      sx={{
                      spacing: 8, width: 300
                      }}
                      onClick={() => { setShowAnswered(true) }}
            >Answered Questions</Button>
          </ButtonGroup>
          { questions !== null && showAnswered === false && Object.keys(questions).map( (questionid) => (
            Object.keys(user.answers).includes(questionid) === false && (          
            <Box
              key={questionid}
              sx={{
                marginY: 2,
                alignItems: 'center',
                color: '#000000',
                backgroundColor: '#00D4FF',
                borderRadius: 2,
                padding: 2,
                width: '100%',
              }}
            >
            <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
              {allUsers[questions[questionid].author].name + ' asks:'}
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
              <img width="100" height="100" alt="avatar" src={allUsers[questions[questionid].author].avatarURL} ></img>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 1,
                }}
              >
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              Would you rather
            </Typography>
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
              {  '...'+ questions[questionid].optionOne.text.substring(0,Math.min(15,questions[questionid].optionOne.text.length)) + '...'}
            </Typography>
            <Link to={"/questions/"+questionid} style={{ textDecoration: 'none', width: '100%' }}>
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
        >
          View Poll
        </Button>
      </Link>
            </Box>
              </Box>
            </Box>)
          )
          )}
          { questions !== null && showAnswered === true && Object.keys(questions).map( (questionid) => (
            Object.keys(user.answers).includes(questionid) === true && (          
            <Box
            key={questionid}
              sx={{
                marginY: 2,
                alignItems: 'center',
                color: '#000000',
                backgroundColor: '#00D4FF',
                borderRadius: 2,
                padding: 2,
                width: '100%',
              }}
            >
            <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
              {allUsers[questions[questionid].author].name + ' asks:'}
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
              <img width="100" height="100" alt="avatar" src={allUsers[questions[questionid].author].avatarURL} ></img>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 1,
                }}
              >
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              Would you rather
            </Typography>
              <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
              {  '...'+ questions[questionid].optionOne.text.substring(0,Math.min(15,questions[questionid].optionOne.text.length)) + '...'}
            </Typography>
            <Link to={"/questions/"+questionid} style={{ textDecoration: 'none', width: '100%' }}>
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
        >
          View Poll
        </Button>
      </Link>
            </Box>
              </Box>
            </Box>)
          )
          )}
        </Box>

      </Container>)
      }
    </ThemeProvider>
    );
}

export default Home;