// @flow

import React from 'react';

import ScreenPage from 'components/ScreenPage';
import ErrorPage from 'components/ErrorPage';

export default () =>
  <ScreenPage withHeader withFooter>
    <ErrorPage
      heading='Error, page not Found'
      errorNumber='4'
      subHeading='Ooups!'
    >
      <p>
        We are very sorry for the inconvenience.
        It looks like you’re trying to access a page that has been deleted or never even existed.
      </p>
    </ErrorPage>
  </ScreenPage>;
