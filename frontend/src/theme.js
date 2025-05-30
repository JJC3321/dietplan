import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A05B4', // Figma purple
    },
    secondary: {
      main: '#5C50FF', // Figma blue
    },
    success: {
      main: '#87ED8C', // Figma green
    },
    background: {
      default: '#D7B3E7', // Figma light purple
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme; 