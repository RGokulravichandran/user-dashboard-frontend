import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#4caf50',
            light: '#80e27e',
            dark: '#087f23'
          },
          secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162'
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
          }
        },
        typography: {
          fontFamily: '"Montserrat", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 500
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 500
          },
          button: {
            textTransform: 'none',
            fontWeight: 500
          }
        },
        shape: {
          borderRadius: 8
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                padding: '8px 24px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                }
              }
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0px 2px 8px rgba(0,0,0,0.1)'
                  : '0px 2px 8px rgba(0,0,0,0.4)'
              }
            }
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'light' ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.23)'
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'light' ? 'rgba(0,0,0,0.87)' : 'rgba(255,255,255,0.87)'
                  }
                }
              }
            }
          }
        }
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};