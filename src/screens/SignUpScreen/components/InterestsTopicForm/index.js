// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Validate from 'services/validation';

import Preloader from 'components/Preloader';
import Button from 'components/Button';
import Tag from 'components/Tag';
import RoundedButton from 'components/RoundedButton';
import Container from 'components/Container';

import stores from 'core/stores';
import store from '../../stepper.store';

import * as S from '../../styles';

const fieldsToValidate = {
  tagList: 'select'
};

const InterestsTopicForm = ({ toNextStep }: any) => {
  const {
    dictionariesStore: { tags },
    sessionStore: { currentUser, setCurrentUser }
  } = stores;

  const [tagList, setTagList] = useState([]);
  const [validation, setValidation] = useState({});

  const user = { tagList };

  const toggleTag = (tag: any) => {
    const tagListCopy = [...tagList];
    if (!tagListCopy.includes(tag.name)) {
      tagListCopy.push(tag.name);
    } else {
      const idx = tagListCopy.indexOf(tag.name);
      tagListCopy.splice(idx, 1);
    }
    setTagList(tagListCopy);
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
    if (currentUser.tagList) setTagList(currentUser.tagList);
  }, [currentUser]);

  useEffect(() => {
    if (tagList.length) validateForm();
  }, [tagList]);

  return (
    <>
      <Container>
        <S.FormLayout>
          <S.FieldsWrap>
            <h3>What topics interest you the most?</h3>
            <S.Subtitle>Help us show you the most relevant content.</S.Subtitle>

            <S.TagList>
              {tags.map(tag => {
                const active = tagList.includes(tag.name);
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

export default observer(InterestsTopicForm);
