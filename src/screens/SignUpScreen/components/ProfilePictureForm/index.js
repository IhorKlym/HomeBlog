// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import AvatarUploader from 'components/AvatarUploader';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import { getUserName } from 'helpers/methods';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  avatarData: 'presence'
};

const ProfilePictureForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [validation, setValidation] = useState({});

  const user = { avatarData };

  const handleChangeAvatar = (file: any, data: any) =>  {
    if (file) setAvatarUrl(file.src);
    if (data) setAvatarData(data.imageData);
  };

  const validateForm = () =>  {
    const validationResult = Validate(user, fieldsToValidate);
    setValidation(validationResult);
  };

  const handleSubmit = async () => {
    if (!validation.isValid) {
      if (avatarUrl) toNextStep(currentUser);
      return;
    };
    const data = await store.completeStep(user);
    if (!data) return;
    setCurrentUser(data);
    toNextStep(data);
  };

  useEffect(() => {
    if (currentUser.avatarUrl) setAvatarUrl(currentUser.avatarUrl);
  }, [currentUser]);

  useEffect(() => {
    if (avatarData) validateForm();
  }, [avatarData]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Add a profile picture</h3>
            <S.Subtitle> {avatarUrl ? 'Looking good!' : 'Give your profile a little bit of personality with your smile!'}</S.Subtitle>

            <AvatarUploader
              user={currentUser}
              name={getUserName(currentUser)}
              avatarUrl={avatarUrl}
              onChange={handleChangeAvatar}
            />

          </S.FieldsWrap>
        </S.FormLayout>
      </Container>

      <S.ButtonWrap toEnd>
        <Button transparent text onClick={toNextStep}>Skip for now</Button>

        <RoundedButton primary disabled={!(validation.isValid || avatarUrl)} onClick={handleSubmit}>Next</RoundedButton>
      </S.ButtonWrap>

      {store.loading && <Preloader position="fixed" backdrop />}
    </>
  );
};

export default observer(ProfilePictureForm);
