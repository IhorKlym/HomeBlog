// @flow

import React from 'react';

import * as S from './styles';

type Props = {
  data: any,
};

const PostCollectionCard = ({ data, ...props }: Props) => {
  const { name, imageUrl, postSystemTagsCount, skin } = data;
  return (
    <S.Wrap {...props} skin={skin} >
      <S.Container>
        <S.CoverImage coverImage={imageUrl} />
        <S.InfoBlock>
          <S.Name>{name}</S.Name>
          <S.Posts>{postSystemTagsCount} posts</S.Posts>
        </S.InfoBlock>
      </S.Container>
    </S.Wrap>
  );
};

export default PostCollectionCard;
