// @flow

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Auth routes
import SignUpScreen from 'screens/SignUpScreen';
import SignUpSuccessScreen from 'screens/SignUpSuccessScreen';
import EmailConfirmationSentScreen from 'screens/EmailConfirmationSentScreen';
import EmailConfirmationScreen from 'screens/EmailConfirmationScreen';
import ForgotPasswordScreen from 'screens/ForgotPassword';
import NewPasswordScreen from 'screens/NewPassword';

// Public routes
import LandingScreen from 'screens/LandingScreen';
import ErrorScreen from 'screens/ErrorScreen';
import TermsAndConditionsScreen from 'screens/TermsAndConditionsScreen';
import PrivacyAndPolicyScreen from 'screens/PrivacyAndPolicyScreen';

import PrivateRoute from './PrivateRoute';

const LandingRouter = () => (
  <Switch>
    <Route path="/sign-up" exact component={SignUpScreen} />
    <Route path="/confirmation" component={EmailConfirmationScreen} />
    <Route path="/forgot-password" exact component={ForgotPasswordScreen} />
    <Route path="/new-password" component={NewPasswordScreen} />
    <Route path="/confirmation-sent" component={EmailConfirmationSentScreen} />
    <PrivateRoute exact
      path="/sign-up/success"
      component={SignUpSuccessScreen}
      allowedRoles={['active']}
      redirect="/sign-up/last"
    />
    <PrivateRoute exact
      path="/sign-up/:step"
      component={SignUpScreen}
      allowedRoles={['pending']}
      redirect="/"
    />

    <Route path="/" exact component={LandingScreen} />
    <Route path="/404" component={ErrorScreen} />
    <Route path="/terms-and-conditions" component={TermsAndConditionsScreen} />
    <Route path="/privacy-and-policy" component={PrivacyAndPolicyScreen} />

    <Redirect from="*" exact to="/404" />
  </Switch>
);

export default LandingRouter;
