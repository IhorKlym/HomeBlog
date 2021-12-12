// @flow

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';
import Container from 'components/Container';
import RoundedButton from 'components/RoundedButton';
import Input from 'components/Input';
import CheckboxCard from 'components/CheckboxCard';
import { IconBack } from 'styles/icons';
import { PROFILE_VISIBILITIES } from 'helpers/consts';

import stores from 'core/stores';
import store from '../store';
import * as S from './styles';

const AccountSettings = () => {
  const {
    dictionariesStore: { tags },
    sessionStore: { setCurrentUser }
  } = stores;
  const { user, credentials, loading, isValid, validationErrors } = store;
  const history = useHistory();

  const isBusiness = user && user.profileType === 'business';
  const allTagsOptions = tags.map(tag => ({ value: tag.name, label: tag.name, color: tag.color }));
  const tagListOption = allTagsOptions.filter(t => !(user.antogonistTagList && user.antogonistTagList.includes(t.value)));
  const antogonistTagOption = allTagsOptions.filter(t => !(user.tagList && user.tagList.includes(t.value)));

  const handleSubmit = async () => {
    const savedUser = await store.saveProfile();
    if (savedUser) {
      setCurrentUser(savedUser);
      history.push('/me');
    }
  };

  useEffect(() => {
    store.getProfile();
  }, []);

  return (
    <ScreenPage withHeader withFooter withTopBar withTheme loading={loading}>
      <S.Wrap>
        <Container>
          <S.Row>

            <S.CancelButton text transparent
              onClick={() => history.push('/me')}
            >
              <IconBack /> Cancel
            </S.CancelButton>

            <S.SettingsWrap>
              <h2>Account Settings</h2>

              {isBusiness ?
                <>
                  <S.Field>
                    <Input
                      type="text"
                      secondary
                      label="Business Name"
                      name="businessName"
                      value={user.businessName || ''}
                      onChange={store.handleChange}
                      error={<S.Text>{validationErrors.businessName}</S.Text>}
                    />
                  </S.Field>
                </>
                :
                <>
                  <S.Field>
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      secondary
                      value={user.firstName || ''}
                      onChange={store.handleChange}
                      error={<S.Text>{validationErrors.firstName}</S.Text>}
                    />
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      secondary
                      value={user.lastName || ''}
                      onChange={store.handleChange}
                      error={<S.Text>{validationErrors.lastName}</S.Text>}
                    />
                  </S.Field>
                </>}

              <S.Field>
                <Input
                  disabled
                  type="text"
                  name="email"
                  label="Email"
                  secondary
                  value={user.email || ''}
                />
              </S.Field>

              <S.Field>
                <Input
                  type="password"
                  name="currentPassword"
                  label="Current Password"
                  secondary
                  defaultValue={credentials.currentPassword}
                  onChange={store.handleChangeCredentials}
                  error={<S.Text>{validationErrors.currentPassword}</S.Text>}
                />
              </S.Field>

              <S.Field>
                <Input
                  type="password"
                  name="password"
                  label="Change Password"
                  secondary
                  defaultValue={credentials.password}
                  onChange={store.handleChangeCredentials}
                  error={<S.Text>{validationErrors.password}</S.Text>}
                />
              </S.Field>

              <S.Field>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  label="Re-enter Password"
                  secondary
                  defaultValue={credentials.passwordConfirmation}
                  onChange={store.handleChangeCredentials}
                  error={<S.Text>{validationErrors.passwordConfirmation}</S.Text>}
                />
              </S.Field>

              <S.Divider></S.Divider>

              <h4>Privacy Settings</h4>
              <p>You may also adjust the privacy settings of your individual posts upon creation.</p>
              <S.Field>
                {(PROFILE_VISIBILITIES || []).map(item => (
                  <CheckboxCard key={item.value}
                    title={item.label}
                    text={item.text}
                    checked={user.visibility === item.value}
                    onClick={() => store.handleChangeOption({ name: 'visibility', value: item.value })}
                  />
                ))}
              </S.Field>

              <S.Divider></S.Divider>

              <h4>Categories of interest</h4>
              <p>Tell us what you’are most interested in, but don’t worry, we will still make sure you see other content.</p>
              <S.Select
                primary
                isMulti
                fulltext
                closeMenuOnSelect={false}
                isSearchable={false}
                name="tagList"
                placeholder="Tag"
                top
                options={tagListOption}
                value={allTagsOptions.filter(t => user.tagList && user.tagList.includes(t.value))}
                onChange={arr => store.handleChangeOption({ name: 'tagList', value: (arr || []).map(item => item.value) })}
                error={<S.Text>{validationErrors.tagList}</S.Text>}
              />

              <h4>Muted topics</h4>
              <p>Mute content whenever these words are used.</p>
              <S.Select
                primary
                isMulti
                top
                fulltext
                closeMenuOnSelect={false}
                isSearchable={false}
                name="antogonistTagList"
                placeholder="Tag"
                options={antogonistTagOption}
                value={allTagsOptions.filter(t => user.antogonistTagList && user.antogonistTagList.includes(t.value))}
                onChange={arr => store.handleChangeOption({ name: 'antogonistTagList', value: (arr || []).map(item => item.value) })}
                error={<S.Text>{validationErrors.antogonistTagList}</S.Text>}
              />
              <S.Text>Need to delete your profile? We would hate to see you go. Please e-mail <a href="mailto:hello@we-know.com">hello@we-know.com</a></S.Text>
            </S.SettingsWrap>

            <S.SaveBtn>
              <RoundedButton primary onClick={handleSubmit} disabled={!isValid}>
                Save
              </RoundedButton>
            </S.SaveBtn>
          </S.Row>
        </Container>
      </S.Wrap>
    </ScreenPage>
  );

};

export default observer(AccountSettings);
