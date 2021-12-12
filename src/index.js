// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import GlobalStyle from 'styles/global';
import stores from 'core/stores';

import App from './App';

const root = document.getElementById('root');

if (root == null) {
  throw new Error('No root element');
}

ReactDOM.render(
  <Provider {...stores}>
    <GlobalStyle />
    <App />
  </Provider>,
  root
);
