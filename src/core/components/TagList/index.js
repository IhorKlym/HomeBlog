// @flow

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import * as S from './styles';

type Props = {
  tags: any[],
  isLinks?: boolean,
  children?: any,
  onTagClick?: (e: Event, tag: any) => any
}

const TagList = ({ tags, children, isLinks, onTagClick, ...props }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname, search } = location;

  const handleTagClick = (e, tag) => {
    if (onTagClick) onTagClick(e, tag);
    if (isLinks) {
      let searchParams = {};
      if (pathname === '/newsfeed' && search) {
        searchParams = qs.parse(search, { ignoreQueryPrefix: true });
      }
      searchParams.tagList = tag.name;
      history.push(`/newsfeed?${qs.stringify(searchParams)}`);
    }
  };

  return (
    <S.TagsWrap {...props}>
      {tags && tags.map(tag => (
        <S.Tag key={tag.id} color={tag.color} onMouseDown={(e) => handleTagClick(e, tag)}>
          <span>{tag.name}</span>
        </S.Tag>
      ))}
      {children}
    </S.TagsWrap>
  );
};

TagList.defaultProps = {
  isLinks: false,
  onTagClick: () => { },
  children: null
};

export default TagList;
