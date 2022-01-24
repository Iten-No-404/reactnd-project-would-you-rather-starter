import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPrompt from './LogIn';
import { selectUser, selectAllUsers } from '../states/UserSlice';
const theme = createTheme();

function Leaderboard() {
    const user = useSelector(selectUser);
    const allUsers = useSelector(selectAllUsers);
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
              { Object.keys(allUsers).map( (uid) => (
                <Box
                key={uid}
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
                {allUsers[uid].name}
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
                <img width="100" height="100" alt="avatar" src={allUsers[uid].avatarURL} ></img>
                <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 1,
                }}
                >
                <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                {  'Answered questions      '+ Object.keys(allUsers[uid].answers).length }
                </Typography>
                <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                {  'Created questions       '+ allUsers[uid].questions.length }
                </Typography>
            </Box>
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
                Score
            </Typography>
                <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                {  allUsers[uid].questions.length + Object.keys(allUsers[uid].answers).length }
            </Typography>
            </Box>
        </Box>
        </Box>
        ))}
        </Box>
        </Container>
        )}
        </ThemeProvider>
     );
}

export default Leaderboard;