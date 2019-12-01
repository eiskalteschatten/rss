import React from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline }  from '@material-ui/core';

import GeneralWrapper from './GeneralWrapper';
import GeneralError from './components/GeneralError';

import theme from './theme';
import store from './store'


import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <GeneralWrapper />
        <GeneralError />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
