// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';

const root = document.getElementById('root');

if (root == null) {
  throw new Error('No root element');
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  root
);
