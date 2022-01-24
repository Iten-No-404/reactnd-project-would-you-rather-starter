import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { logOut, selectUser } from '../states/UserSlice';
const theme = createTheme();

function Navigation() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleClick = () => {
      dispatch(logOut());
    };
    return ( 
        <ThemeProvider theme={theme}>
        <Container
          sx={{ width: '100%' }}
        >
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
          <Box
            sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#00D4FF',
              borderRadius: 2,
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography component="h2" color="white" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                Home
              </Typography>
            </Link>
            <Link to="/add" style={{ textDecoration: 'none' }}>
              <Typography component="h2" color="white" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                New Question
              </Typography>
            </Link>
            <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
              <Typography component="h2" color="white" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                Leaderboard
              </Typography>
            </Link>
          { user.loggedin && ( 
            <Box sx={{               
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center', 
              marginLeft: 50,
              }}>
              <Typography component="h2" color="white" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
              {'Hello, '+ user.name}
              </Typography>
              <img width="50" height="50" alt="avatar" src={user.avatarURL} ></img>
              <Button
              disableRipple
              variant="contained"
              size="large"
              font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
              style={{
              backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 'bold', textTransform: 'none',
              }}
              sx={{
              spacing: 8, mt: 1.5, mr: 1, ml: 1, mb: 1, width: 100
              }}
              onClick={() => handleClick()}>
              <Typography component="h2" color="#00D4FF" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
                {'Logout'}
              </Typography>
              </Button>
            </Box>
          )}
          </Box>
        </Container>
      </ThemeProvider>
     );
}

export default Navigation;