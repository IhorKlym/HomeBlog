// @flow

import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import Preloader from 'components/Preloader';
import Input from 'components/Input';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import store from './store';

import * as S from '../../styles';

const CredentialsForm = () => {
  const history = useHistory();
  const { loading, signUp, credentials, handleChangeCredentials, isValid, validationErrors } = store;

  const handleSubmit = async () => {
    const data = await signUp();
    if (data) {
      history.push('/confirmation-sent');
    }
  };

  const handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') handleSubmit();
  };

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Let’s get the boring stuff <br/> out of the way</h3>
            <S.AuthItem>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={credentials.email}
                onChange={handleChangeCredentials}
                error={validationErrors.email || (!!credentials.email && <S.Text>Perfect</S.Text>)}
                onKeyPress={handleInputKeyPress}
              />
            </S.AuthItem>

            <S.AuthItem>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={credentials.password}
                onChange={handleChangeCredentials}
                error={validationErrors.password || <S.Text>{credentials.password ? 'Great!' : 'We’ll need at least 8 characters'}</S.Text>}
                onKeyPress={handleInputKeyPress}
              />
            </S.AuthItem>
          </S.FieldsWrap>

        </S.FormLayout>
      </Container>

      <S.ButtonWrap>
        <p><span>By clicking next, you agree to WeKnow’s </span>
          <Button transparent text onClick={() => history.push('terms-and-conditions')}>
            Terms and Conditions of Use
          </Button>
        </p>

        <RoundedButton primary disabled={!isValid} onClick={handleSubmit}>Next</RoundedButton>
      </S.ButtonWrap>
      {loading && <Preloader position="fixed" backdrop />}
    </>
  );
};

export default observer(CredentialsForm);
