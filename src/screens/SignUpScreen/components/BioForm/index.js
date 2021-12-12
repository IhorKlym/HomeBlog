// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import Textarea from 'components/Textarea';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  bio: {
    format: {
      pattern: /^((?!\s*$)(.|\n)+){1,350}/,
      message: '350 character limit'
    }
  }
};

const BioForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [bio, setBio] = useState('');
  const [validation, setValidation] = useState({});

  const user = { bio };
  const validationErrors = validation.errors || {};

  const validateForm = () =>  {
    const validationResult = Validate(user, fieldsToValidate);
    setValidation(validationResult);
  };

  const handleSubmit = async () => {
    if (!validation.isValid) return;
    const data = await store.completeStep(user);
    if (!data) return;
    setCurrentUser(data);
    toNextStep(data);
  };

  useEffect(() => {
    if (currentUser.bio) setBio(currentUser.bio);
  }, [currentUser]);

  useEffect(() => {
    validateForm();
  }, [bio]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Tell us about yourself</h3>
            <S.AuthItem>
              <Textarea
                name="bio"
                xl
                placeholder="Help us get to know you better! Where are you from? Kids? Pets? Any crazy interests? Are you a professional kite flyer? Maybe a Marine Biologist? Do you love Daniel Tiger more than your kids do? Do you enjoy cake tasting more than arranging tables? We want to know!"
                value={user.bio || ''}
                onChange={e => setBio(e.target.value)}
                error={validationErrors.bio || <S.Text>{(user.bio && user.bio.length < 350) ? 'Thanks!' : '350 character limit'}</S.Text>}
                errorStyles={{ textAlign: 'left' }}
                maxLength={350}
              />
            </S.AuthItem>
          </S.FieldsWrap>
        </S.FormLayout>
      </Container>

      <S.ButtonWrap toEnd>
        <Button transparent text onClick={toNextStep}>Skip for now</Button>

        <RoundedButton primary disabled={!validation.isValid} onClick={handleSubmit}>Next</RoundedButton>
      </S.ButtonWrap>

      {store.loading && <Preloader position="fixed" backdrop />}
    </>
  );
};

export default observer(BioForm);
