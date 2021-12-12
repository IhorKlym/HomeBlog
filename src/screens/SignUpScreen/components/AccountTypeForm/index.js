// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import CheckboxCard from 'components/CheckboxCard';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  profileType: 'presence'
};

const AccountTypeForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [profileType, setProfileType] = useState(null);
  const [validation, setValidation] = useState({});

  const user = { profileType };

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
    if (currentUser.profileType) setProfileType(currentUser.profileType);
  }, [currentUser]);

  useEffect(() => {
    if (profileType) validateForm();
  }, [profileType]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Are you an individual or a business?</h3>
            <S.AuthItem toStart alignStretch>
              <CheckboxCard
                title="Individual"
                checked={profileType === 'individual'}
                onClick={() => setProfileType('individual')}
              />
              <CheckboxCard
                title="Business"
                checked={profileType === 'business'}
                onClick={() => setProfileType('business')}
              />
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

export default observer(AccountTypeForm);
