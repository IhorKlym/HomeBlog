// @flow

import React, { useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import { parseAddress } from 'helpers/location';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

declare var google: any;

const fieldsToValidate = {
  location: 'presence'
};

const LocationForm = ({ toNextStep }: any) => {
  const { sessionStore: { currentUser, setCurrentUser } } = stores;

  const addressInput = useRef(null);
  let autocomplete;

  const [location, setLocation] = useState(null);
  const [validation, setValidation] = useState({});

  const user = { ...location };
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

  const handleChangeAddress = () => {
    const place = autocomplete.getPlace();
    const address = parseAddress(place);
    setLocation(address);
  };

  const initGoogleAutocomplete = () => {
    autocomplete = new google.maps.places.Autocomplete(addressInput.current, { types: ['geocode'] });
    autocomplete.addListener('place_changed', handleChangeAddress);
  };

  useEffect(() => {
    initGoogleAutocomplete();
  }, []);

  useEffect(() => {
    if (currentUser.location) {
      setLocation({ location: currentUser.location });
      if (addressInput.current) addressInput.current.value = currentUser.location;
    }
  }, [currentUser]);

  useEffect(() => {
    if (location) validateForm();
  }, [location]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>Where do you live?</h3>
            <S.AuthItem>
              <Input
                name="location"
                placeholder="Location..."
                inputRef={addressInput}
                error={validationErrors.location || (!!location && <S.Text>Perfect</S.Text>)}
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

export default observer(LocationForm);
