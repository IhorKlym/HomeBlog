// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewsfeedScreen from 'screens/NewsfeedScreen';
import PostScreen from 'screens/PostScreen';

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={NewsfeedScreen} />
    <Route exact path="/posts/:postId" component={PostScreen} />
  </Switch>
);

export default MainRouter;
