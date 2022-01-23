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
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPrompt from './LogIn';
import { selectUser } from '../states/UserSlice';
const theme = createTheme();


function Home() {
    const title = 'It works !!!!!';
    const [showAnswered, setShowAnswered] = useState(false);
    // const [blogName, setBlogNameh] = useState('');
    // const [age, setAgeh] = useState('');
    // const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // const step = useSelector(selectStep);
    // const message = useSelector(selectStatusMessage);
    // useEffect(() => {
    //   dispatch(setStatusMessage());
    // }, []);
    // if (user.loggedIn === true) {
    //   window.location.replace('/dashboard');
    // }
    return ( 
    <ThemeProvider theme={theme}>
      { user.loggedin === false ? (
        <LogInPrompt />
      ) : 
      (
        <Container sx={{ width: '100%' }} >
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography component="h2" color="black" fontSize="4.5rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          </Link>
        </Box>
        {/* { message === '' ? (<Box />)
          : (
            <Box
              sx={{
                borderRadius: 1,
                marginBottom: 1.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#FFFFFF',
                padding: '14px 15px',
                backgroundColor: '#00000040',
                textAlign: 'center',
                fontSize: '0.875rem',
                font: '"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;',
              }}
            >
              <Typography
                component="h2"
                fontSize="0.875rem"
                font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'
              >
                {message}
              </Typography>
            </Box>
          )} */}
      </Container>)
      }
    </ThemeProvider>
    );
}

export default Home;