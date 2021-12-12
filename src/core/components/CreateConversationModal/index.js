// @flow
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import qs from 'qs';
import { getUserName } from 'helpers/methods';
import InfiniteScroll from 'react-infinite-scroller';
import RoundedButton from 'components/RoundedButton';
import Modal from 'components/Modal';
import Search from 'components/Search';
import Avatar from 'components/Avatar';
import Preloader from 'components/Preloader';
import stores from 'core/stores';
import { IconCheck } from 'styles/icons';

import * as S from './styles';

type Props = {
  open: boolean,
  onClose: () => {},
  title?: string | any,
  query?: any,
}

const paginationLimit = 10;

const CreateConversationModal = ({ open, onClose, title, query }: Props) => {
  const { messengerStore, connectionsStore } = stores;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const scrollParentRef = useRef(null);
  const pendingFetchRef = useRef(false);

  const handleCreate = async () => {
    setLoading(true);
    let [conversation] = await messengerStore.findConversationsByParticipants(participants, true);
    if (!conversation) {
      conversation = await messengerStore.createConversation('', participants);
      messengerStore.getConversations();
    }
    const encodedQuery = qs.stringify(query, { ignoreQueryPrefix: true });
    setParticipants([]);
    setSearch('');
    setLoading(false);
    onClose();
    history.push(`/messenger/${conversation.id}?${encodedQuery}`);
  };

  const fetchConnections = async (fetchMore: ?boolean) => {
    if (!open || (fetchMore && pendingFetchRef.current)) return;
    try {
      setLoading(true);
      pendingFetchRef.current = true;
      const currentPage = fetchMore ? page + 1 : 0;
      setPage(currentPage);
      const params = {
        sort: '-created_at',
        filter: {
          q: search
        },
        page: {
          offset: currentPage * paginationLimit,
          limit: paginationLimit
        }
      };
      const data = await connectionsStore.getMyConnections(params);
      setConnections(fetchMore ? [...connections, ...data] : data);
      setLoading(false);
      pendingFetchRef.current = false;
    } catch (e) {
      setLoading(false);
      pendingFetchRef.current = false;
    }
  };

  const loadMoreConnections = () => {
    fetchConnections(true);
  };

  const toggleParticipant = (user: any) => {
    const updatedParticipants = [...participants];
    const participant = updatedParticipants.find(item => item.id === user.id);
    if (participant) {
      const idx = updatedParticipants.indexOf(participant);
      updatedParticipants.splice(idx, 1);
    } else {
      updatedParticipants.push(user);
    }
    setParticipants(updatedParticipants);
  };

  useEffect(() => {
    fetchConnections();
  }, [open, search]);

  const currentPage = page + 1;
  return (
    <Modal md authWithHeader
      allowOverflow
      open={open}
      onClose={onClose}
      header={title || 'New Message'}
    >
      <Search
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        debaunceTimeout={600}
        placeholder="Search connections"
      />

      {!!participants.length && <S.Participants>
        {participants.map(participant => (
          <S.Participant key={participant.id}>
            <S.ParticipantAvatar>
              <Avatar cover rounded user={participant} />
            </S.ParticipantAvatar>
            <S.ParticipantName>
              {getUserName(participant)}
            </S.ParticipantName>
            <S.ParticipantDeleteButton onClick={() => toggleParticipant(participant)} />
          </S.Participant>
        ))}
      </S.Participants>}

      <S.Connections ref={scrollParentRef}>
        <InfiniteScroll
          pageStart={currentPage}
          loadMore={loadMoreConnections}
          hasMore={open && !loading && (connections.length === currentPage * paginationLimit)}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          {(connections.length ? connections.map((connection) => {
            const choosen = !!participants.find(item => item.id === connection.id);
            return (
              <S.Connection key={connection.id} choosen={choosen} onClick={() => toggleParticipant(connection)}>
                <S.ConnectionAvatarWrap>
                  <S.ConnectionAvatar>
                    <Avatar cover rounded user={connection} />
                  </S.ConnectionAvatar>
                  {choosen && <S.ConnectionCheckmark>
                    <IconCheck />
                  </S.ConnectionCheckmark>}
                </S.ConnectionAvatarWrap>
                <S.ConnectionName>
                  {getUserName(connection)}
                </S.ConnectionName>
              </S.Connection>
            );
          })
            :
            <S.NoData>
              Nothing to show
            </S.NoData>
          )}
        </InfiniteScroll>
      </S.Connections>

      <S.ButtonWrap>
        <RoundedButton xs primary disabled={!participants.length} onClick={handleCreate}>
          Next
        </RoundedButton>
      </S.ButtonWrap>

      {loading && <Preloader size={36} />}
    </Modal>
  );
};

CreateConversationModal.defaultProps = {
  title: null,
  query: {}
};

export default observer(CreateConversationModal);
