// @flow

import React, { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import MainRouter from 'routes/MainRouter';
import Preloader from 'components/Preloader';

const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
        
    </BrowserRouter>
  );
};

export default observer(App);
