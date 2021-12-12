// @flow

import React, { useState } from 'react';
import type { ChildrenArray, Element } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';

type Props = {
  label: any,
  children: ChildrenArray<Element<any>>,
  notifications?: number,
  forceRedirectOnClick?: boolean,
  hideList?: boolean,
  redirectTo?: any
}

const DropDown = ({ label, notifications, children, hideList, forceRedirectOnClick, redirectTo, ...props }: Props) => {
  const [isOpen, setOpening] = useState(false);
  const history = useHistory();

  const toggleOpening = () => {
    if ((!(children && children.length) || forceRedirectOnClick) && redirectTo) {
      history.push(redirectTo);
    } else {
      setOpening(!isOpen);
    }
  };

  return (
    <S.Container {...props}>
      <S.Label onClick={toggleOpening}>
        {!!notifications && <S.Pending />}
        {label}
      </S.Label>

      {!hideList && children && !!children.length && <S.Wrap isOpen={isOpen} onClick={toggleOpening}><S.List>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {children.map((child, index) => <li key={index} className="dropdown__item">{child}</li>)}
      </S.List></S.Wrap>}

      <S.Backdrop isOpen={isOpen} onClick={toggleOpening} />
    </S.Container>
  );
};

DropDown.defaultProps = {
  hideList: false,
  redirectTo: null,
  forceRedirectOnClick: false,
  notifications: 0
};

export default DropDown;
