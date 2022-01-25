import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GlobalStyles } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInPrompt from './LogIn';
import { getUsers, selectUser } from '../states/UserSlice';
import { getQuestions, saveQuestion, selectAddedQuestionId, resetAddedId } from '../states/QuestionsSlice';
const theme = createTheme();

function AddQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const addedQuestionId = useSelector(selectAddedQuestionId);
    useEffect(() => {
        dispatch(getQuestions());
        dispatch(getUsers());
    }, [dispatch]);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const [submit, setSubmit] = useState(false);
    if ( submit && addedQuestionId !== '' ){
        navigate('/questions/'+addedQuestionId);
        dispatch(resetAddedId());
    }
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
            <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
                <Box
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
                    <Typography component="h2" color="black" fontSize="2rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Create New Question
                    </Typography>
                    <Divider></Divider>
                    <Divider orientation="vertical" flexItem sx={{ marginX: 2}}/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'normal',
                            margin: 1,
                        }}
                        >
                    <Typography component="h2" color="black" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'normal' }}>
                    {'Continue the question:'}
                    </Typography>
                    <Typography component="h2" color="black" fontSize="1.4rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', marginTop: 2 }}>
                    {'Would you rather ...'}
                    </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: 1,
                                }}
                                >
                                        { submit && optionOne.trim() === '' && 
                                            (
                                                <Typography component="h2" color="red" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
                                                {'Please write an option'}
                                                </Typography>
                                            )
                                        }
                                        <TextField
                                            id="optionOneInput"
                                            type="text"
                                            placeholder="Enter Option One Text Here"
                                            value={optionOne}
                                            onChange={(e) => {
                                                setOptionOne(e.target.value);
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            autoFocus
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 3,
                                                fontSize: '1rem',
                                                border: 'none',
                                            }}
                                            inputProps={{
                                                style: {
                                                padding: '11px 13px',
                                                },
                                            }}
                                            />
                                        <Divider orientation="horizontal" flexItem sx={{ marginX: 2}}>OR</Divider>
                                        { submit && optionTwo.trim() === '' && 
                                            (
                                                <Typography component="h2" color="red" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold' }}>
                                                {'Please write an option'}
                                                </Typography>
                                            )
                                        }
                                        <TextField
                                            id="optionTwoInput"
                                            type="text"
                                            placeholder="Enter Option Two Text Here"
                                            value={optionTwo}
                                            onChange={(e) => {
                                                setOptionTwo(e.target.value);
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 3,
                                                fontSize: '1rem',
                                                border: 'none',
                                            }}
                                            inputProps={{
                                                style: {
                                                padding: '11px 13px',
                                                },
                                            }}
                                            />
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        size="large"
                                                        font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
                                                        style={{
                                                            backgroundColor: '#FFFFFF', color: '#00D4FF', fontWeight: 'bold', textTransform: 'none',
                                                        }}
                                                        sx={{
                                                            mt: 3, mr: 1, ml: 1, mb: 1, 
                                                        }}
                                                        type="submit"
                                                        onClick={() => { 
                                                            setSubmit(true);
                                                            if (optionOne.trim() !== '' && optionTwo.trim() !== ''){
                                                                dispatch(saveQuestion({
                                                                    author: user.id,
                                                                    optionOneText: optionOne.trim(),
                                                                    optionTwoText: optionTwo.trim(),
                                                                }));
                                                                dispatch(getQuestions());
                                                            }
                                                        }}
                                                        >
                                                        Submit
                                                        </Button>
                            </Box>
                        </Box>
                </Box>
            </Box>
        </Container>
      )}
      </ThemeProvider>
     );
}

export default AddQuestion;