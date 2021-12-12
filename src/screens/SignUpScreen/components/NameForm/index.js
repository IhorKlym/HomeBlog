// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidatePersonal = {
  firstName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'First Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'First Name length should be 2 or more symbols'
    }
  },
  lastName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'Last Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'Last Name length should be 2 or more symbols'
    }
  }
};

const fieldsToValidateBusiness = {
  businessName: {
    format: {
      pattern: /^(?!\s*$).+/,
      message: 'Business Name length should be 2 or more symbols'
    },
    length: {
      minimum: 2,
      message: 'Business Name length should be 2 or more symbols'
    }
  }
};

const NameForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [validation, setValidation] = useState({});

  const isBusiness = currentUser.profileType === 'business';
  const user = isBusiness ? { businessName } : { firstName, lastName };
  const validationErrors = validation.errors || {};

  const validateForm = () =>  {
    const fieldsToValidate = isBusiness ? fieldsToValidateBusiness : fieldsToValidatePersonal;
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

  const handleInputKeyPress = (e: any) => {
    if (e && e.key === 'Enter') handleSubmit();
  };

  useEffect(() => {
    if (currentUser.firstName) setFirstName(currentUser.firstName);
    if (currentUser.lastName) setLastName(currentUser.lastName);
    if (currentUser.businessName) setBusinessName(currentUser.businessName);
  }, [currentUser]);

  useEffect(() => {
    if (firstName || lastName || businessName) validateForm();
  }, [currentUser, firstName, lastName, businessName]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>{isBusiness ? 'What’s the name of your business?' : 'What’s your name?'}</h3>

            {isBusiness ?
              <>
                <S.AuthItem>
                  <Input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={businessName || ''}
                    onChange={e => setBusinessName(e.target.value)}
                    error={validationErrors.businessName || (!!businessName && <S.Text>Perfect</S.Text>)}
                    onKeyPress={handleInputKeyPress}
                  />
                </S.AuthItem>
              </>
              :
              <>
                <S.AuthItem>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName || ''}
                    onChange={e => setFirstName(e.target.value)}
                    error={validationErrors.firstName}
                    onKeyPress={handleInputKeyPress}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName || ''}
                    onChange={e => setLastName(e.target.value)}
                    error={validationErrors.lastName || (!!lastName && <S.Text>Nice to meet you!</S.Text>)}
                    onKeyPress={handleInputKeyPress}
                  />
                </S.AuthItem>
              </>}
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

export default observer(NameForm);
