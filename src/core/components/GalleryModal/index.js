// @flow

import React, { useState, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react';
import ImageLazyLoad from 'components/ImageLazyLoad';
import stores from 'core/stores';

import * as S from './styles';

const GalleryModal = () => {
  const { helperStore } = stores;
  const { galleryAlbum } = helperStore;
  const [currentSlide, setCurrentSlide] = useState(0);
  const open = !!galleryAlbum.length;

  const handleClose = () => {
    helperStore.setGalleryAlbum([]);
  };

  const closeOnEscape = (e: any) => {
    if (e.key === 'Escape') handleClose();
  };

  useEffect(() => {
    if (document.body) {
      document.body.classList.toggle('modal-open', open);
    }
    if (open) {
      document.addEventListener('keyup', closeOnEscape);
    } else {
      setCurrentSlide(0);
    }
    return () => {
      document.removeEventListener('keyup', closeOnEscape);
    };
  }, [open]);

  const toPrev = (e) => {
    e.stopPropagation();
    let prev = currentSlide - 1;
    if (prev < 0) prev = galleryAlbum.length - 1;
    setCurrentSlide(prev);
  };

  const toNext = (e) => {
    e.stopPropagation();
    let next = currentSlide + 1;
    if (next > galleryAlbum.length - 1) next = 0;
    setCurrentSlide(next);
  };

  return (
    <S.Container open={open}>
      <S.Modal open={open}>
        {galleryAlbum.map((media, i) => {
          const active = currentSlide === i;
          const photo = media.type === 'photos';
          return (open && active) && <Fragment key={media.id}>
            {photo ?
              <ImageLazyLoad inOriginalSize withZooom src={media.url} />
              :
              <video controls autoPlay>
                <source src={media.videoUrl} />
                <track default kind="captions" src="" />
              </video>}
          </Fragment>;
        })}
      </S.Modal>

      {galleryAlbum.length > 1 && <>
        <S.Control prev onClick={toPrev} />
        <S.Control next onClick={toNext} />
      </>}

      <S.Backdrop
        open={open}
        onClick={handleClose}>
      </S.Backdrop>

      <S.CloseBtn onClick={handleClose} />
    </S.Container>
  );
};

export default observer(GalleryModal);
