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
import DiscoverScreen from 'screens/DiscoverScreen';
import ErrorScreen from 'screens/ErrorScreen';
import TermsAndConditionsScreen from 'screens/TermsAndConditionsScreen';
import PrivacyAndPolicyScreen from 'screens/PrivacyAndPolicyScreen';

// User related routes
import NewsfeedScreen from 'screens/NewsfeedScreen';
import ProfileScreen from 'screens/ProfileScreen';
import PostScreen from 'screens/PostScreen';
import EditProfileScreen from 'screens/EditProfileScreen';
import AccountSettings from 'screens/EditProfileScreen/AccountSettings';
import ConnectionsScreen from 'screens/ConnectionsScreen';
import NotificationsScreen from 'screens/NotificationsScreen';
import NetworksScreen from 'screens/NetworksScreen';
import SearchResultsScreen from 'screens/SearchResultsScreen';
import MessengerScreen from 'screens/MessengerScreen';

import PrivateRoute from './PrivateRoute';

const MainRouter = () => (
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
      redirect="/newsfeed"
    />

    <Route path="/discover" exact component={DiscoverScreen} />
    <Route path="/404" component={ErrorScreen} />
    <Route path="/terms-and-conditions" component={TermsAndConditionsScreen} />
    <Route path="/privacy-and-policy" component={PrivacyAndPolicyScreen} />
    <Route exact path="/newsfeed" component={NewsfeedScreen} />

    <PrivateRoute
      path="/account-settings"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={AccountSettings}
    />
    <PrivateRoute
      path="/edit-profile"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={EditProfileScreen}
    />
    <PrivateRoute exact
      path="/me"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={ProfileScreen}
    />
    <PrivateRoute exact
      path="/me/:connectionType(connections|suggested-connections)"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={ConnectionsScreen}
    />
    <PrivateRoute exact
      path="/users/:userId"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={ProfileScreen}
    />
    <PrivateRoute exact
      path="/users/:userId/:connectionType(connections|mutual-connections)"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={ConnectionsScreen}
    />
    <PrivateRoute
      path="/posts/:postId"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={PostScreen}
    />
    <PrivateRoute exact
      path="/search"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={SearchResultsScreen}
    />
    <PrivateRoute exact
      path="/networks"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={NetworksScreen}
    />
    <PrivateRoute exact
      path="/messenger/:conversationId?"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={MessengerScreen}
    />
    <PrivateRoute exact
      path="/notifications"
      redirect="/sign-up/last"
      allowedRoles={['active']}
      component={NotificationsScreen}
    />

    <Redirect from="/" exact to="/newsfeed" />
    <Redirect from="*" exact to="/404" />
  </Switch>
);

export default MainRouter;
