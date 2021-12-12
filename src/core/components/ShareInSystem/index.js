// @flow
import React, { useState } from 'react';
import CreatePostButton from 'components/CreatePostButton';
import CreateConversationModal from 'components/CreateConversationModal';

import { IconDownload } from 'styles/icons';
import * as S from './styles';

type Props = {
  data: any,
  repost?: boolean,
  share?: boolean,
  mobile?: boolean
};

const ShareInSystem = ({ data = {}, share, repost, mobile, ...rest }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <S.Share {...rest} isOpen={showModal} >
      {!mobile && <S.ShareButton onClick={() => setShowModal(true)}>
        <IconDownload />
      </S.ShareButton> }

      <S.ShareContent mobile={mobile}>
        {repost && <CreatePostButton repostData={data} onOpenModal={() => setShowModal(false)}>
          <S.ShareItem>
            Repost to Your Profile
          </S.ShareItem>
        </CreatePostButton>}

        {share && <S.ShareItem onClick={() => { setShowModal(false); setShowMessageModal(true); }}>
          Share in a Message
        </S.ShareItem>}
      </S.ShareContent>

      <S.ShareBackDrop onClick={() => setShowModal(false)} />

      <CreateConversationModal
        open={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Share message"
        query={{ sharePostId: data.post ? data.post.id : '', shareReplyId: data.reply ? data.reply.id : '' }}
      />
    </S.Share>
  );
};

ShareInSystem.defaultProps = {
  share: false,
  repost: false,
  mobile: false
};

export default ShareInSystem;
