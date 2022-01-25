import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
const theme = createTheme();

function NotFound() {
    return (
        <ThemeProvider theme={theme}>
        <Container  sx={{ width: 800 }}>
          <CssBaseline />
          <GlobalStyles
            styles={{
                body: {
                backgroundColor: '#FFFFFF',
                height: '100%',
                backgroundPosition: 'center',
              },
            }}
          />
            <Box
            sx={{
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
                    <Typography component="h2" color="white" fontSize="6rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Error 404
                    </Typography>
                    <Typography component="h2" color="white" fontSize="6rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Page Not Found
                    </Typography>
                </Box>
            </Box>
        </Container>
        </ThemeProvider>

    );
}

export default NotFound;