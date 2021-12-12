// @flow

import React, { useState, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import RoundedButton from 'components/RoundedButton';
import imgPlaceholder from 'static/img/placeholder.jpg';
import { useScrollPosition } from 'hooks/scrollPosition';
import { IconMagnifierPlus, IconMagnifierMinus, IconMagnifierBack } from 'styles/icons';

import * as S from './styles';

type Props = {
  src: string,
  placeholderSrc?: any,
  alt?: string,
  offset?: number,
  inOriginalSize?: boolean,
  withZooom?: boolean,
  onImageLoaded?: any
}

const ImageLazyLoad = ({ src, placeholderSrc, alt, offset, inOriginalSize, withZooom, onImageLoaded, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrap = useRef();

  useScrollPosition(
    ({ currPos }) => {
      const isVisible = currPos.top <= window.innerHeight + offset;
      if (isVisible) setVisible(true);
    },
    [wrap],
    wrap
  );

  const handleImageLoaded = () => {
    setLoaded(true);
    if (onImageLoaded) onImageLoaded();
  };

  return (
    <S.Wrap {...props} ref={wrap} inOriginalSize={inOriginalSize}>
      <S.Image
        className="placeholder-image"
        visible={!loaded}
        src={placeholderSrc || imgPlaceholder}
        alt={alt}
      />
      {withZooom && visible && loaded ?
        <TransformWrapper
          defaultScale={1}
          minScale={1}
          maxScale={(withZooom && loaded) ? 3 : 1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <S.ToolsWrap>
                <RoundedButton primary small onClick={zoomIn}><IconMagnifierPlus /></RoundedButton>
                <RoundedButton primary small onClick={zoomOut}><IconMagnifierMinus /></RoundedButton>
                <RoundedButton primary small onClick={resetTransform}><IconMagnifierBack /></RoundedButton>
              </S.ToolsWrap>
              <TransformComponent>
                <S.Image
                  className="original-image"
                  visible={loaded}
                  src={src}
                  alt={alt}
                  onLoad={handleImageLoaded}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper> : <S.Image
          className="original-image"
          visible={loaded}
          src={src}
          alt={alt}
          onLoad={handleImageLoaded}/>}
    </S.Wrap>
  );
};

ImageLazyLoad.defaultProps = {
  placeholderSrc: null,
  alt: 'Not Loaded',
  offset: 0,
  inOriginalSize: false,
  withZooom: false,
  onImageLoaded: null
};

export default ImageLazyLoad;
