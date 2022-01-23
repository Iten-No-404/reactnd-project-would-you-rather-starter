import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { logIn, setId } from '../states/UserSlice';

const theme = createTheme();

function LogInPrompt() {
    const title = 'Welcome to the Would You Rather App!';
    const subTitle = 'Please sign in to continue';
    const dispatch = useDispatch();
    const [userid, setUserid] = useState('sarahedo');
    const handleChange = (event) => {
        setUserid(event.target.value);
        dispatch(setId(event.target.value));
      };
      const handleClick = (event) => {
        dispatch(logIn());
      };
    return ( 
        <ThemeProvider theme={theme}>
        <Container
          sx={{ width: 500 }}
        >
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: '#FFFFFF',
                height: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              },
            }}
          />
          <Box
            sx={{
              marginTop: 1,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#CBF6FF',
              borderWidth: 5,
              borderColor: '#0000FF',
              borderRadius: 2,
            }}
          >
            <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
            {title}
            </Typography>
            <Typography component="h2" color="gray" fontSize="0.8rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
            {subTitle}
            </Typography>
            <Typography component="h2" color="#00D4FF" fontSize="3rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginRight: 4 }}>
            Sign In
            </Typography>
            <Box sx={{ minWidth: 300, backgroundColor: '#FFFFFF' }}>
            <FormControl fullWidth>
                <Select
                id="user-select"
                value={userid}
                onChange={handleChange}
                >
                <MenuItem value='sarahedo'>Sarah Edo</MenuItem>
                <MenuItem value='tylermcginnis'>Tyler McGinnis</MenuItem>
                <MenuItem value='johndoe'>John Doe</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Button
                fullWidth
                disableRipple
                variant="contained"
                size="large"
                font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
                style={{
                backgroundColor: '#00b8ff', color: '#000000', fontWeight: 'bold', textTransform: 'none',
                }}
                sx={{
                spacing: 8, mt: 1.5, mr: 1, ml: 1, mb: 1, width: 300
                }}
                onClick={() => handleClick()}
      >
        Sign In
      </Button>
          </Box>
        </Container>
      </ThemeProvider>
     );
}

export default LogInPrompt;