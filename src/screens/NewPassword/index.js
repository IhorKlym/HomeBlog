// @flow

import React, { Component } from 'react';
import type { Location, History } from 'react-router';
import { observer } from 'mobx-react';
import qs from 'qs';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import Preloader from 'components/Preloader';

import * as S from './styles';
import store from './store';

type Props = {
  history: History,
  location: Location,
  validationErrors: {
    password: string,
    passwordConfirmation: string
  }
};

@observer
class NewPassword extends Component<Props> {
  handleSubmit = () => {
    const { updatePassword } = store;
    const { location: { search }, history } = this.props;
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    const confirmationToken = query.confirmation_token;

    updatePassword(confirmationToken).then(() => history.push('/'));
  };

  handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') this.handleSubmit();
  };

  render() {
    const { credentials, handleChangeCredentials, validationErrors, loading } = store;

    return (
      <ScreenPage withHeader>
        <S.Wrap>
          <Container>
            <S.FormLayout>
              <S.FormWrap>
                <h3>Choose a new password</h3>

                <S.AuthItem>
                  <Input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    defaultValue={credentials.password}
                    onChange={handleChangeCredentials}
                    error={validationErrors.password}
                    onKeyPress={this.handleInputKeyPress}
                  />

                  <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    defaultValue={credentials.passwordConfirmation}
                    onChange={handleChangeCredentials}
                    error={validationErrors.passwordConfirmation}
                    onKeyPress={this.handleInputKeyPress}
                  />
                </S.AuthItem>

                <p>Create a new password that is at least 6 characters long with a combination of letters, numbers, and punctuation marks.</p>

                <S.ButtonWrap>
                  <Button primary extended onClick={this.handleSubmit}>SUBMIT</Button>
                </S.ButtonWrap>
              </S.FormWrap>
            </S.FormLayout>
          </Container>

          {loading && <Preloader position="fixed" backdrop/>}
        </S.Wrap>
      </ScreenPage>
    );
  }
}

export default NewPassword;
