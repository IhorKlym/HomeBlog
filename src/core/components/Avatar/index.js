// @flow

import React from 'react';
import { getUserName } from 'helpers/methods';

import * as S from './styles';

type Props = {
  user: any,
  withInitials?: boolean,
  withTooltip?: boolean
}

const Avatar = ({ user, withInitials, withTooltip, ...props }: Props) => {
  const userTheme = (user && user.skin && user.skin.id) || null;

  const renderInitials = () => (
    withInitials && <strong>{getUserName(user, true)}</strong>
  );

  const renderAvatar = () => (
    user.avatarUrl ?
      <img src={user.avatarUrl} alt={getUserName(user, true)} />
      :
      renderInitials()
  );

  return (
    <S.ImgWrap {...props} theme={userTheme} >
      {user && renderAvatar()}
      {withTooltip && <div className="avatar__tooltip">
        {getUserName(user)}
      </div>}
    </S.ImgWrap>
  );
};

Avatar.defaultProps = {
  withTooltip: false,
  withInitials: false
};

export default Avatar;
