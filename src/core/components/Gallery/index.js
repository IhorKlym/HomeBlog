// @flow

import React from 'react';
import { observer } from 'mobx-react';
import ImageLazyLoad from 'components/ImageLazyLoad';
import { IconMultiPhoto } from 'styles/icons';
import stores from 'core/stores';

import * as S from './styles';

type Props = {
  album: any[],
  children?: any,
  onPreviewLoaded?: any,
};

const Gallery = ({ children, album, onPreviewLoaded, ...rest }: Props) => {
  const { helperStore } = stores;

  const handleOpen = () => {
    helperStore.setGalleryAlbum(album);
  };

  return (
    <S.Wrap {...rest} onClick={e => { e.stopPropagation(); }}>
      {album.length > 1 && <S.MultiPhoto onClick={handleOpen}><IconMultiPhoto /></S.MultiPhoto>}
      <S.Toogle onClick={handleOpen}>
        {children || <>
          {album[0].type === 'photos' ?
            <ImageLazyLoad src={album[0].url} offset={100} onImageLoaded={onPreviewLoaded} />
            :
            <video onLoadStart={onPreviewLoaded}>
              <source src={album[0].videoUrl} />
              <track default kind="captions" src="" />
            </video>}
        </>}
      </S.Toogle>
    </S.Wrap>
  );
};

Gallery.defaultProps = {
  children: null,
  onPreviewLoaded: null
};

export default observer(Gallery);
