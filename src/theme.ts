import { Poppins, Work_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const worksans = Work_Sans(
  {
    subsets: ['latin']
  }
)

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
   typography: {
      fontFamily: roboto.style.fontFamily,
      fontSize: 12,
      h1: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 40,
      },
      h2: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 32,
      },
      h3: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 24,
      },
      h4: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 20,
      },
      h5: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 16,
      },
      h6: {
        fontFamily: roboto.style.fontFamily,
        fontSize: 14,
      },
    },
  // typography: {
  //   fontFamily: roboto.style.fontFamily,
  // },
  
});

export default theme;