// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import ThemePicker from 'components/ThemePicker';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  skin: 'presence'
};

const ThemeSettingsForm = ({ toNextStep, setTheme }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [skinId, setSkinId] = useState(null);
  const [validation, setValidation] = useState({});

  const user = { skin: { id: skinId } };

  const handleChangeTheme = (skin: any) => {
    setSkinId(skin.id);
    if (setTheme) setTheme(skin.id);
  };

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
    if (currentUser.skin && currentUser.skin.id) setSkinId(currentUser.skin.id);
  }, [currentUser]);

  useEffect(() => {
    if (skinId) validateForm();
  }, [skinId]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Personalize your profile</h3>

            <ThemePicker
              selected={user.skin.id}
              onChange={handleChangeTheme}
            />
          </S.FieldsWrap>
        </S.FormLayout>
      </Container>

      <S.ButtonWrap toEnd>
        <RoundedButton primary disabled={!validation.isValid} onClick={handleSubmit}>Next</RoundedButton>
      </S.ButtonWrap>

      {store.loading && <Preloader position="fixed" backdrop />}
    </>
  );
};

export default observer(ThemeSettingsForm);
