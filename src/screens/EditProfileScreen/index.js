// @flow

import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import RoundedButton from 'components/RoundedButton';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import ThemePicker from 'components/ThemePicker';
import AvatarUploader from 'components/AvatarUploader';
import { IconBack } from 'styles/icons';
import Preloader from 'components/Preloader';
import { getUserName } from 'helpers/methods';
import { parseAddress } from 'helpers/location';

import stores from 'core/stores';
import store from './store';
import * as S from './styles';

declare var google: any;

const EditProfileScreen = () => {
  const { sessionStore: { setCurrentUser } } = stores;
  const { user, loading, isValid, validationErrors } = store;
  const theme = (user && user.skin && user.skin.id) || null;
  const history = useHistory();

  const addressInput = useRef(null);
  let autocomplete;

  const handleChangeAddress = () => {
    const place = autocomplete.getPlace();
    const address = parseAddress(place);
    store.handleChangeAddress(address);
  };

  const initGoogleAutocomplete = () => {
    autocomplete = new google.maps.places.Autocomplete(addressInput.current, { types: ['geocode'] });
    autocomplete.addListener('place_changed', handleChangeAddress);
  };

  const handleChangeTheme = (skin: any) => {
    store.handleChangeOption({ name: 'skin', value: skin });
  };

  const handleSubmit = async () => {
    const savedUser = await store.saveProfile();
    if (savedUser) {
      setCurrentUser(savedUser);
      history.push('/me');
    }
  };

  useEffect(() => {
    store.getProfile();
    initGoogleAutocomplete();
  }, []);

  useEffect(() => {
    if (user.location) {
      if (addressInput.current) addressInput.current.value = user.location;
    }
  }, [user]);

  return (
    <ScreenPage withHeader withFooter withTopBar withTheme theme={theme}>
      <S.Wrap>
        <Container>
          <S.Row>

            <S.CancelButton text transparent
              onClick={() => history.push('/me')}
            >
              <IconBack /> Cancel
            </S.CancelButton>

            <S.ProfileWrap>

              <AvatarUploader
                size='160'
                user={user}
                name={getUserName(user)}
                avatarUrl={user.avatarUrl}
                onChange={store.handleChangeAvatar}
              />
              <S.ProfileItem>
                <Input
                  name="location"
                  placeholder="Location..."
                  label="Location"
                  inputRef={addressInput}
                  error={validationErrors.location}
                />
              </S.ProfileItem>

              <S.ProfileItem>
                <Textarea
                  name="bio"
                  xl
                  label="Bio"
                  placeholder="Help us get to know you better! Where are you from? Kids? Pets? Any crazy interests? Are you a professional kite flyer? Maybe a Marine Biologist? Do you love Daniel Tiger more than your kids do? Do you enjoy cake tasting more than arranging tables? We want to know!"
                  value={user.bio || ''}
                  error={<S.Text>{validationErrors.bio || ((user.bio && user.bio.length < 350) ? 'Thanks!' : '350 character limit')}</S.Text>}
                  onChange={store.handleChange}
                  maxLength={350}
                />
              </S.ProfileItem>

              <S.ProfileItem>
                <p>Theme</p>
                <ThemePicker
                  selected={theme}
                  onChange={handleChangeTheme}
                />
              </S.ProfileItem>
            </S.ProfileWrap>

            <S.SaveBtn>
              <RoundedButton primary onClick={handleSubmit} disabled={!isValid}>
                Save
              </RoundedButton>
            </S.SaveBtn>

          </S.Row>
        </Container>

        {loading && <Preloader position="fixed" backdrop />}
      </S.Wrap>
    </ScreenPage>
  );

};

export default observer(EditProfileScreen);
