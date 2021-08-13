import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ReactElement } from 'react';
import Head from 'next/head';

import client from '../util/apollo-client';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Raleway',
  },

  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(0, 0, 70, 0.4)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
    'dark-lg': 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
  },

  borders: {
    brand: {
      100: 'rgb(53, 57, 76)',
      200: 'rgb(44, 50, 60)',
      300: 'rgb(38, 42, 52)',
      400: 'rgb(34, 38, 46)',
      500: 'rgb(28, 32, 40)',
      600: 'rgb(22, 26, 34)',
      700: 'rgb(18, 22, 28)',
      800: 'rgb(15, 18, 24)',
      900: 'rgb(10, 12, 18)',
    },
  },
  colors: {
    brand: {
      100: 'rgb(53, 57, 76)',
      200: 'rgb(44, 50, 60)',
      300: 'rgb(38, 42, 52)',
      400: 'rgb(34, 38, 46)',
      500: 'rgb(28, 32, 40)',
      600: 'rgb(22, 26, 34)',
      700: 'rgb(18, 22, 28)',
      800: 'rgb(15, 18, 24)',
      900: 'rgb(10, 12, 18)',
    },
    primary: {
      default: 'rgb(53, 57, 76)',
      100: '#f7fafc',
      700: '#1a202c',
      900: '#1a202c',
      500: '#1a202c',
    },
    secondary: {
      default: 'rgb(113, 118, 150)',
    },
    accent: {
      default: 'rgb(58, 77, 201)',
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@200;300;400;500;700&family=Open+Sans:wght@300&family=Raleway:wght@100;300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
