// @flow
import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import conversationMessagesApi from 'api/conversationMessages.api';
import postsApi from 'api/posts.api';
import repliesApi from 'api/replies.api';
import moment from 'moment';
import qs from 'qs';

import Avatar from 'components/Avatar';
import Preloader from 'components/Preloader';
import TextFormatted from 'components/TextFormatted';
import Modal from 'components/Modal';
import PostCard from 'components/PostCard';
import { IconBack, IconSend } from 'styles/icons';

import { formatTimeToLocal, getUserName } from 'helpers/methods';
import useInterval from 'hooks/useInterval';
import useWindowSize from 'hooks/windowSize';
import stores from 'core/stores';

import { whitePrimary } from 'styles/colors';
import * as S from './styles';

const Messenger = () => {
  const { messengerStore, sessionStore: { currentUser } } = stores;
  const history = useHistory();
  const { conversationId } = useParams();
  const { search } = useLocation();
  const { sharePostId, shareReplyId } = qs.parse(search, { ignoreQueryPrefix: true });
  const [loading, setLoading] = useState(false);
  const [sharedPost, setSharedPost] = useState(null);
  const [sharedReply, setSharedReply] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const newMessageRef = useRef('');
  const newMessageTextRef = useRef('');
  const formSubmittedRef = useRef(false);
  const messagesMapRef = useRef(new Map());
  const scrollParentRef = useRef(null);
  const lastFetchTimeRef = useRef(null);
  const prevMsgDateRef = useRef(null);
  const actualConvId = useRef(null);
  const lastReadTimeRef = useRef(moment().utc().toISOString());
  let showedUnreadBlock = false;
  const otherParticipants = ((conversation && conversation.participants) || []).filter(participant => participant.user.id !== (currentUser || {}).id);
  const windowSize = useWindowSize();
  const mobileDevice = windowSize.width < 768;
  let newMessagePlaceholder = messages.length ? 'Write a response...' : 'Start a new message';
  if (sharedPost) newMessagePlaceholder = 'Write a message...';

  const handleChangeNewMessage = (html: any, pureText: any) => {
    newMessageRef.current = html;
    newMessageTextRef.current = pureText || '';
    setNewMessage(html);
  };

  const parseMessages = () => {
    const msgs = (Array.from<any>(messagesMapRef.current.values()) || []).sort((a, b) => (
      moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
    ));
    setMessages(msgs);
    if (msgs.length) {
      messengerStore.setLastMessageInConversation(actualConvId.current, msgs[msgs.length - 1]);
    }
  };

  const getCurrentConversation = async () => {
    setLoading(true);
    const conv = await messengerStore.getConversation(conversationId);
    if (conversationId !== actualConvId.current) return;
    const me = conv.participants.find(p => p.user.id === currentUser.id);
    let date = moment().utc().toISOString();
    if (me && me.isConversationUnread && me.receivedMessageAt) {
      date = me.receivedMessageAt;
    }
    lastReadTimeRef.current = date;
    setConversation(conv);
    setLoading(false);
  };

  const getAllMessages = async (params: any = {}, silent: boolean = false) => {
    lastFetchTimeRef.current = moment.utc().subtract(5, 'minutes').toISOString();
    setLoading(!silent);
    const msgs = await messengerStore.getConversationMessages(conversationId, params);
    if (conversationId !== actualConvId.current) return;
    msgs.forEach(msg => {
      messagesMapRef.current.set(msg.id, msg);
    });
    parseMessages();
    messengerStore.getUnreadConversations();
    setLoading(false);
    if (msgs.length && scrollParentRef.current && !(params.page && params.page.offset)) {
      scrollParentRef.current.scrollTop = scrollParentRef.current.scrollHeight;
    }
    if (params.page && params.page.limit === msgs.length) {
      await setTimeout(() => setHasMoreMessages(true), 100);
    }
  };

  const fetchNewMessages = () => {
    if (lastFetchTimeRef.current) {
      getAllMessages({
        filter: {
          created_from_at: lastFetchTimeRef.current
        }
      }, true);
    }
  };

  const handleLoadMoreMessages = () => {
    setHasMoreMessages(false);
    getAllMessages({ page: { offset: messages.length, limit: 20 } });
  };

  const handleSendNewMessage = async () => {
    const message = newMessageRef.current;
    const messageText = newMessageTextRef.current;
    if (formSubmittedRef.current || !(messageText && messageText.trim())) return;
    formSubmittedRef.current = true;
    setLoading(true);
    lastReadTimeRef.current = moment().utc().toISOString();
    if (sharePostId || shareReplyId) {
      const participants = (conversation && conversation.participants) || [];
      const params = {
        filter: {
          users_ids: `${participants.map(p => p.user.id).join(',')}|1`
        }
      };
      if (shareReplyId) {
        await conversationMessagesApi.shareReply(shareReplyId, message, params);
      } else {
        await conversationMessagesApi.sharePost(sharePostId, message, params);
      }
      history.replace(`/messenger/${conversationId}`);
    } else {
      await messengerStore.sendNewMessage(conversationId, message, {});
    }
    handleChangeNewMessage('');
    setSharedPost(null);
    setLoading(false);
    formSubmittedRef.current = false;
    fetchNewMessages();
  };

  const getConversationData = async () => {
    lastFetchTimeRef.current = null;
    lastReadTimeRef.current = moment().utc().toISOString();
    setConversation(null);
    messagesMapRef.current.clear();
    parseMessages();
    getCurrentConversation();
    await getAllMessages({ page: { offset: 0, limit: 20 } });
  };

  const getSharedPost = async () => {
    setLoading(true);
    const params = {
      include: 'user.skin,photos,videos'
    };
    const { data: post } = await postsApi.getPost(sharePostId, params);
    setSharedPost(post);
    setLoading(false);
  };

  const getSharedReply = async () => {
    setLoading(true);
    const { data: reply } = await repliesApi.getReply(shareReplyId);
    setSharedReply(reply);
    setLoading(false);
  };

  const handleNewMessageKeyDown = e => {
    if (e.nativeEvent.key === 'Enter') {
      e.nativeEvent.preventDefault();
      handleSendNewMessage();
    }
  };

  const handleCancelShare = () => {
    setSharedPost(null);
    setSharedReply(null);
    history.replace(`/messenger/${conversationId}`);
  };

  useEffect(() => {
    actualConvId.current = conversationId;
    getConversationData();
    handleChangeNewMessage('');
  }, [conversationId]);

  useEffect(() => {
    if (sharePostId) {
      getSharedPost();
    } else {
      setSharedPost(null);
    }
  }, [sharePostId]);

  useEffect(() => {
    if (shareReplyId) {
      getSharedReply();
    } else {
      setSharedReply(null);
    }
  }, [shareReplyId]);

  useInterval(() => {
    fetchNewMessages();
  }, 5000);

  const goBack = () => {
    history.goBack();
  };

  const [openViewModal, setOpenViewModal] = useState(false);

  return (
    <S.Wrap>
      {conversation && <>

        <S.DataItem>
          <S.BackButton onClick={goBack}>
            <IconBack />
          </S.BackButton>
          <S.Participants>
            {otherParticipants.length ?
              <>
                {otherParticipants.slice(0, 3).map(({ user }) => (
                  <S.Participant to={`/users/${user.id}`} aria-label="user" key={user.id}>
                    <S.ParticipantAvatar >
                      <Avatar rounded cover user={user} />
                    </S.ParticipantAvatar>
                    <S.ParticipantName>
                      {getUserName(user)}
                    </S.ParticipantName>
                  </S.Participant>
                ))}
                {otherParticipants.length > 3 && <S.ChatCount onClick={() => setOpenViewModal(true)}>({otherParticipants.length})</S.ChatCount>}
              </>
              :
              <S.Participant to={`/users/${currentUser.id}`} aria-label="user" key={currentUser.id}>
                <S.ParticipantAvatar >
                  <Avatar rounded cover user={currentUser} />
                </S.ParticipantAvatar>
                <S.ParticipantName>
                  Me
                </S.ParticipantName>
              </S.Participant>}
          </S.Participants>
        </S.DataItem>

        <S.List ref={scrollParentRef}>
          <InfiniteScroll
            isReverse
            loadMore={handleLoadMoreMessages}
            hasMore={hasMoreMessages}
            useWindow={false}
            getScrollParent={() => scrollParentRef.current}
          >
            <>
              {(messages.length ?
                messages.map((msg, idx) => {
                  const { participant: { user }, createdAt, share } = msg;
                  let showNew = false;
                  const diff = moment(lastReadTimeRef.current).diff(moment(createdAt));
                  if (diff <= 0 && !showedUnreadBlock) {
                    showedUnreadBlock = true;
                    showNew = true;
                  }
                  let showDate = false;
                  const msgDate = formatTimeToLocal(createdAt, 'MMMM D, YYYY');
                  if (idx === 0 || prevMsgDateRef.current !== msgDate) {
                    showDate = true;
                    prevMsgDateRef.current = msgDate;
                  }
                  let msgSharedPost;
                  if (share && share.type === 'replies') {
                    if (share.post) {
                      msgSharedPost = { ...share.post, replies: [share] };
                    }
                  } else {
                    msgSharedPost = share;
                  }
                  return (
                    <div key={msg.id}>
                      {showNew && <S.MsgsDate>
                        New Messages
                      </S.MsgsDate>}

                      {showDate && <S.MsgsDate>
                        {prevMsgDateRef.current}
                      </S.MsgsDate>}

                      <S.Message isMy={currentUser.id === user.id}>
                        {(currentUser.id !== user.id) &&
                          <S.ParticipantAvatar className='message-avatar' to={`/users/${user.id}`} aria-label="user">
                            <Avatar withTooltip cover user={user} />
                          </S.ParticipantAvatar>}

                        <div className='message-content'>
                          <div className='message-text'>
                            <S.Text>
                              <TextFormatted highlight={['hashtags', 'mentions']} text={msg.body} />
                            </S.Text>

                            {!!msgSharedPost && <div className='message-attachment'>
                              <PostCard
                                isAttachment
                                post={msgSharedPost}
                                background={whitePrimary}
                              />
                            </div>}
                          </div>
                          <div className='message-date'>
                            {formatTimeToLocal(createdAt, 'hh:mm a')}
                          </div>
                        </div>
                      </S.Message>
                    </div>
                  );
                })
                :
                <S.NoData>
                  <p>Nothing to show</p>
                  <p>Write your first message</p>
                </S.NoData>
              )}
            </>

          </InfiniteScroll>
        </S.List>

        <S.DataItemBottom>
          <S.NewMessageForm>
            <S.TextFieldWrap radius={sharedPost ? 20 : 30}>
              <S.TextField
                highlight={['hashtags', 'mentions']}
                placeholder={newMessagePlaceholder}
                value={newMessage}
                onChange={handleChangeNewMessage}
                onKeyDown={e => handleNewMessageKeyDown(e)}
              />

              {sharedPost &&
                <div className='message-attachment'>
                  <PostCard
                    isAttachment
                    post={{ ...sharedPost, replies: sharedReply ? [sharedReply] : [] }}
                    onDelete={handleCancelShare}
                    background='#F9E9E2'
                  />
                </div>}
            </S.TextFieldWrap>

            {mobileDevice && (
              <S.ButtonSent
                onClick={handleSendNewMessage}
                disabled={!newMessage}
              >
                <IconSend />
              </S.ButtonSent>
            )}
          </S.NewMessageForm>
        </S.DataItemBottom>
      </>}

      {loading && <Preloader />}

      <Modal md auth
        allowOverflow
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        header={`${otherParticipants.length} members in this conversation`}
      >
        <S.ParticipantWrap>
          {otherParticipants.map(({ user }) => (
            <S.Participant to={`/users/${user.id}`} aria-label="user" key={user.id}>
              <S.ParticipantAvatar >
                <Avatar rounded cover user={user} />
              </S.ParticipantAvatar>
              <S.ParticipantName>
                {getUserName(user)}
              </S.ParticipantName>
            </S.Participant>
          ))}
        </S.ParticipantWrap>
      </Modal>
    </S.Wrap>
  );
};

export default observer(Messenger);
