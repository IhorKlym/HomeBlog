// @flow
import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import useWindowSize from 'hooks/windowSize';
import Button from 'components/Button';
import Search from 'components/Search';
import Preloader from 'components/Preloader';
import CreateConversationModal from 'components/CreateConversationModal';
import { IconBack, IconTopicFollowActive } from 'styles/icons';

import stores from 'core/stores';

import ConversationListItem from '../ConversationListItem';

import * as S from './styles';

const ConversationsList = () => {
  const { messengerStore } = stores;
  const { loading, conversations, totalConversationsCount, itemsCountOnPage, unreadConversations } = messengerStore;
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [search, setSearch] = useState('');
  const { conversationId } = useParams();
  const scrollParentRef = useRef(null);
  const history = useHistory();
  const windowSize = useWindowSize();

  const fetchConversations = (fetchMore: ?boolean) => {
    if (!fetchMore) messengerStore.clearConversations();
    const params = {};
    if (search) params.filter = { query: search };
    messengerStore.getConversations(fetchMore, params);
  };

  const handleLoadMoreConversations = () => {
    messengerStore.loadMoreConversations();
    if (totalConversationsCount && (totalConversationsCount - conversations.length) <= itemsCountOnPage * 2) {
      fetchConversations(true);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [search]);

  useEffect(() => {
    if (conversations.length && !conversationId && windowSize.width > 768) {
      history.push(`/messenger/${conversations[0].id}`);
    }
  }, [conversations, conversationId]);

  return (
    <S.Wrap>
      <S.BackButton onClick={() => history.replace('/me')}>
        <IconBack /> Back to Your Profile
      </S.BackButton>

      <S.Header>
        <span>Inbox ({unreadConversations.length})</span>
        <Button text transparent onClick={() => setOpenCreateModal(true)}>
          <IconTopicFollowActive /> New Message
        </Button>
      </S.Header>

      <S.SearchWrap>
        <Search
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          debaunceTimeout={300}
          placeholder="Search"
        />
      </S.SearchWrap>

      <S.List ref={scrollParentRef}>
        <InfiniteScroll
          loadMore={handleLoadMoreConversations}
          hasMore={!loading && totalConversationsCount > conversations.length}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          {loading && <Preloader size={48} />}
          <>
            {!!unreadConversations.length &&
              unreadConversations.map(conv => (
                <ConversationListItem key={conv.id} unread conversation={conv} active={conv.id === conversationId} />
              ))}
            {conversations.length ?
              conversations.map(conv => {
                const isUnread = !!unreadConversations.find(c => c.id === conv.id);
                return !isUnread && <ConversationListItem key={conv.id} conversation={conv} active={conv.id === conversationId} />;
              })
              :
              <S.NoData>
                <p>Nothing to show</p>
                <p>Create your first conversation</p>
              </S.NoData>}
          </>

        </InfiniteScroll>
      </S.List>

      <CreateConversationModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </S.Wrap>
  );
};

export default observer(ConversationsList);
