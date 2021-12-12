// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import CheckboxCard from 'components/CheckboxCard';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import { PROFILE_VISIBILITIES } from 'helpers/consts';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  visibility: 'presence'
};

const PrivacySettingsForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [visibility, setVisibility] = useState('semi_private');
  const [validation, setValidation] = useState({});

  const user = { visibility };

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
    if (currentUser.visibility) setVisibility(currentUser.visibility);
  }, [currentUser]);

  useEffect(() => {
    if (visibility) validateForm();
  }, [visibility]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Please setup your privacy</h3>
            <S.AuthItem toStart alignStretch>
              {(PROFILE_VISIBILITIES || []).map(item => (
                <CheckboxCard key={item.value}
                  title={item.label}
                  text={item.text}
                  checked={visibility === item.value}
                  onClick={() => setVisibility(item.value)}
                />
              ))}
            </S.AuthItem>
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

export default observer(PrivacySettingsForm);
