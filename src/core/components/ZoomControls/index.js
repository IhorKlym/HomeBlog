// @flow

import React from 'react';
import * as S from './styles';

type Props = {
  value: number,
  onChange: (newValue: number) => any,
  min?: number,
  max?: number,
  step?: number
}

const ZoomControls = ({ value, onChange, min = 1, max = 3, step = 0.5 }: Props) => {

  const zoomIn = () => {
    onChange(Math.min(max, value + step));
  };

  const zoomOut = () => {
    onChange(Math.max(min, value - step));
  };

  const handleZoomChange = (e: any) => {
    onChange(Number(e.target.value));
  };

  return (
    <S.ZoomControls className="zoom-controls">
      <span>Zoom:</span>

      <S.ZoomBtn zoomOut
        className="zoom-controls__btn zoom-out"
        onClick={zoomOut}
      />

      <input
        type='range'
        value={value}
        min={min}
        max={max}
        step={0.1}
        onChange={handleZoomChange}
      />

      <S.ZoomBtn zoomIn 
        className="zoom-controls__btn zoom-in"
        onClick={zoomIn}
      />
    </S.ZoomControls>
  );
};

ZoomControls.defaultProps = {
  min: 1,
  max: 3,
  step: 0.5
};

export default ZoomControls;
