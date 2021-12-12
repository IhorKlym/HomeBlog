// @flow
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Button from 'components/Button/styles';
import Preloader from 'components/Preloader';

import stores from 'core/stores';
import * as S from './styles';

const FollowButton = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);
  const { connectionsStore } = stores;

  const handleFollowAction = async () => {
    setLoading(true);
    await connectionsStore.followUser(user);
    setLoading(false);
  };

  return (user &&
    <S.Wrap hasMargin={!!user.bio} className='follow-button'>
      <Button text onClick={handleFollowAction}>
        {user.isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
      {!user.isFollowed && <S.Tooltip>
        This person is public. You can click follow to see their content without connecting to their network.
      </S.Tooltip>}
      {loading && <Preloader size={16} />}
    </S.Wrap>
  );
};

export default observer(FollowButton);
