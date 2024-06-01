'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';


// Importing Roboto font with specific configurations
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Specifying font weights
  subsets: ['latin'], // Including only the Latin subset of the font
  display: 'swap', // Using font-display: swap for better performance
});

// Creating a Material-UI theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#00796B",
            contrastText: '#fff'
        },
        secondary: {
            main: "#000",
            dark: '#444',
            contrastText: '#fff'
        },
        background:{
            default: "#fff",
            paper: "#fff"
        }
    },

    shape: {
        borderRadius: 15
    },

    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components:{
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: 11
                    }
                }
            ]
        }
    }
});

export default theme;
