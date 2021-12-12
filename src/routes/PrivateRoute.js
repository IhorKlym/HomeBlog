import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import stores from 'core/stores';

type Props = {
  component: Component,
  allowedRoles?: string[],
  redirect?: string
}

const PrivateRoute = ({ component: Component, allowedRoles, redirect, ...rest }: Props) => {
  const { sessionStore: { currentUser } } = stores;
  const allowed = currentUser && allowedRoles.includes(currentUser.state);
  return (
    <Route {...rest} render={props => (
      !allowed ? <Redirect to={redirect} /> : <Component {...props} />
    )} />
  );
};

PrivateRoute.defaultProps = {
  allowedRoles: [],
  redirect: '/'
};

export default observer(PrivateRoute);
