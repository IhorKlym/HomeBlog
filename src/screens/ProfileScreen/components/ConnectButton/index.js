// @flow
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import ConfirmModal from 'components/ConfirmModal';
import { getUserName } from 'helpers/methods';

import stores from 'core/stores';

import * as S from './styles';

const ConnectButton = ({ user }: any) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const { connectionsStore } = stores;

  const handleRequestAction = () => {
    setLoading(true);
    connectionsStore.createRequest(user).finally(() => {
      setLoading(false);
      setSent(true);
    });
  };

  const handleDisconnect = () => {
    setConfirmData({
      text: `Are you sure that you want to delete ${getUserName(user)} from your connections?`,
      onCancel: () => setConfirmData(null),
      onConfirm: () => {
        setConfirmData(null);
        setLoading(true);
        connectionsStore.disconnect(user).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <S.Wrap>
      {user.levelOfConnect !== 1
        ?
        <>
          {user.isSendRequest &&
            <RoundedButton primary disabled>
              Request sent!
            </RoundedButton>}
          {!user.isSendRequest && !user.isReceiveRequest &&
            <RoundedButton primary onClick={handleRequestAction} disabled={sent}>
              {sent ? 'Request sent!' : 'Connect'}
            </RoundedButton>}
          {!user.isSendRequest && <S.Tooltip> Add this person to your network.</S.Tooltip>}
        </>
        :
        <>
          <RoundedButton primary onClick={handleDisconnect}>
            Disconnect
          </RoundedButton>
          <ConfirmModal data={confirmData} />
        </>}

      {loading && <Preloader size={16} />}
    </S.Wrap>
  );
};

export default observer(ConnectButton);
