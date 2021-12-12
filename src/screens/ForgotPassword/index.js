// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import imgMail from 'static/svg/mail.svg';

import * as S from './styles';
import store from './store';

type Props = {
  ...RouteComponentProps
}

@observer
class ForgotPassword extends Component<Props> {

  handleSubmit = async () => {
    await store.resetPassword();
  };

  handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') this.handleSubmit();
  };

  render() {
    const { credentials, handleChangeCredentials, validationErrors, loading, showMessage } = store;
    return (
      <ScreenPage withHeader>
        <S.Wrap>
          <Container>
            <S.FormLayout>
              {showMessage ? (
                <S.Item>
                  <img src={imgMail} alt="alt" />
                  <h3 className="text_success">Mail was send to you email.</h3>
                </S.Item>
              ) : (
                <S.WormFwrap>
                  <h3>No worries, please enter your email, and we’ll send you a link to get back into the know.</h3>

                  <S.AuthItem>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={credentials.email}
                      onChange={handleChangeCredentials}
                      error={validationErrors.email}
                      onKeyPress={this.handleInputKeyPress}
                    />
                  </S.AuthItem>

                  <S.ButtonWrap>
                    <RoundedButton primary onClick={this.handleSubmit}>SUBMIT</RoundedButton>
                  </S.ButtonWrap>
                </S.WormFwrap>
              )}
            </S.FormLayout>
          </Container>

          {loading && <Preloader position="fixed" backdrop />}
        </S.Wrap>
      </ScreenPage>
    );
  }
}

export default ForgotPassword;
