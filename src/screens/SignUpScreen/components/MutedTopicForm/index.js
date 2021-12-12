// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import Tag from 'components/Tag';
import Button from 'components/Button';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  antogonistTagList: 'select'
};

const MutedTopicForm = ({ toNextStep }: any) => {
  const {
    dictionariesStore: { tags },
    sessionStore: { currentUser, setCurrentUser }
  } = stores;

  const [filteredTags, setFilteredTags] = useState([]);
  const [antogonistTagList, setTagListBanned] = useState([]);
  const [validation, setValidation] = useState({});

  const user = { antogonistTagList };

  const toggleTag = (tag: any) => {
    const antogonistTagListCopy = [...antogonistTagList];
    if (!antogonistTagListCopy.includes(tag.name)) {
      antogonistTagListCopy.push(tag.name);
    } else {
      const idx = antogonistTagListCopy.indexOf(tag.name);
      antogonistTagListCopy.splice(idx, 1);
    }
    setTagListBanned(antogonistTagListCopy);
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
    if (currentUser.antogonistTagList) setTagListBanned(currentUser.antogonistTagList);
  }, [currentUser]);

  useEffect(() => {
    if (antogonistTagList.length) validateForm();
  }, [antogonistTagList]);

  useEffect(() => {
    const filtered = tags.filter(tag => !(currentUser && currentUser.tagList && currentUser.tagList.includes(tag.name)));
    setFilteredTags(filtered);
  }, [tags, currentUser]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>What topics would you like to mute?</h3>
            {!!filteredTags.length && <S.Subtitle>We won`t show you content related to these topics</S.Subtitle>}

            <S.TagList>
              {!filteredTags.length ?
                <S.NoDataText>
                  There are no topics you can mute. <br />
                  You have defined all available topics as &quot;interested in&quot; on the previous screen.
                </S.NoDataText>
                :
                filteredTags.map(tag => {
                  const active = antogonistTagList.includes(tag.name);
                  return (
                    <Tag boxed key={tag.id}
                      active={active}
                      tag={tag}
                      onTagClick={(e, t) => toggleTag(t)}
                    />
                  );
                })}
            </S.TagList>
          </S.FieldsWrap>
        </S.FormLayout>
      </Container>

      <S.ButtonWrap toEnd>
        <Button text transparent onClick={toNextStep}>
          Skip for now
        </Button>

        <RoundedButton primary disabled={!validation.isValid} onClick={handleSubmit}>Next</RoundedButton>
      </S.ButtonWrap>

      {store.loading && <Preloader position="fixed" backdrop />}
    </>
  );
};

export default observer(MutedTopicForm);
