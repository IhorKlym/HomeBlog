// @flow
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { LEVEL_FILTERS } from 'helpers/consts';
import stores from 'core/stores';
import { white } from 'styles/colors';
import useWindowSize from 'hooks/windowSize';

import peoplesStore from '../SearchPeople/store';
import postsStore from '../SearchPosts/store';

import * as S from './styles';

const Filters = () => {
  const { dictionariesStore: { tags } } = stores;
  const { search } = useLocation();
  const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
  const isProfiles = searchParams.tab === 'profiles';
  const store = isProfiles ? peoplesStore : postsStore;
  const { filters } = store;

  const windowSize = useWindowSize();
  const filtersCount = store.getFiltersCount();
  const [isOpen, setOpenFilter] = useState(false);

  const otherFilter = () => (
    <>
      <S.ColTitle>
        Other
      </S.ColTitle>

      <S.FiltersBlock>
        <S.FilterItem>
          <Checkbox
            color={white}
            title="Posts I’m following"
            name="followed"
            checked={filters.followed}
            onChange={() => store.handleFilterChange({ name: 'followed', value: !filters.followed })}
          />

          <Checkbox
            color={white}
            title="Unanswered questions"
            name="unanswered"
            checked={filters.unanswered}
            onChange={() => store.handleFilterChange({ name: 'unanswered', value: !filters.unanswered })}
          />
        </S.FilterItem>
      </S.FiltersBlock>
    </>
  );

  return (
    <S.Wrap isOpen={isOpen}>
      <S.FilterHeader>
        <S.HeadCol>
          Filters
          {!!filtersCount && <S.FiltersCount>{filtersCount} selected</S.FiltersCount>}
        </S.HeadCol>

        <S.HeadCol>
          {isOpen || (windowSize.width > 767) ? (
            <Button text transparent onClick={store.clearFilters}>
              Clear All
            </Button>
          ) : null}

          {(windowSize.width < 768) && <S.FilterButton isOpen={isOpen} onClick={() => setOpenFilter(!isOpen)} />}
        </S.HeadCol>
      </S.FilterHeader>

      <S.FiltersRow>
        <S.FiltersCol>
          <S.ColTitle>
            Degree of Separation
          </S.ColTitle>

          <S.FiltersBlock>
            {LEVEL_FILTERS.map(item => (
              <S.FilterItem key={item.value}>
                <Checkbox
                  color={white}
                  title={item.label}
                  name="levels"
                  value={filters.levels}
                  checked={store.filterHasOption({ name: 'levels', option: item.value })}
                  onChange={() => store.toggleFilterOption({ name: 'levels', option: item.value })}
                />
              </S.FilterItem>
            ))}
          </S.FiltersBlock>

          {(windowSize.width < 768 && !isProfiles) && otherFilter()}
        </S.FiltersCol>

        {!isProfiles && <S.FiltersCol grow={3}>
          <S.ColTitle>
            Categories
          </S.ColTitle>

          <S.FiltersBlock>
            {tags.map(item => (
              <S.FilterItem key={item.id}>
                <Checkbox
                  color={white}
                  title={item.name}
                  name="tagList"
                  value={filters.tagList}
                  checked={store.filterHasOption({ name: 'tagList', option: item.name })}
                  onChange={() => store.toggleFilterOption({ name: 'tagList', option: item.name })}
                />
              </S.FilterItem>
            ))}
          </S.FiltersBlock>
        </S.FiltersCol>}

        {(windowSize.width > 767 && !isProfiles) && (
          <S.FiltersCol>
            {otherFilter()}
          </S.FiltersCol>
        )}
      </S.FiltersRow>
    </S.Wrap>
  );
};

export default observer(Filters);
