// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal from 'components/Modal';
import { useLocation } from 'react-router-dom';

import RoundedButton from 'components/RoundedButton';
import Button from 'components/Button';
import TextFieldFormatted from 'components/TextFieldFormatted';
import Switch from 'components/Switch';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';
import FileUploader from 'components/FileUploader';
import PostCard from 'components/PostCard';
import { IconVideo, IconPhoto, IconTopicFollow } from 'styles/icons';
import { PROFILE_VISIBILITIES } from 'helpers/consts';
import { getUserName } from 'helpers/methods';
import stores from 'core/stores';

import SuccessModal from './components/SuccessModal';

import store from './store';

import * as S from './styles';

const CreatePostModal = () => {
  const {
    dictionariesStore: { tags, getTagListByKeywords },
    sessionStore: { currentUser },
    helperStore
  } = stores;
  const { createPostOptions } = helperStore;
  const showModal = !!createPostOptions;
  const editMode = createPostOptions && createPostOptions.post;
  const repostData = (createPostOptions && createPostOptions.repostData) || {};
  const { loading, post, modes, mode, validationErrors, uploadingFiles, deletedMedia } = store;
  const { photos = [], videos = [] } = post;
  const album = [...photos, ...videos];
  const location = useLocation();
  const [successModalOptions, setSuccessModalOptions] = useState({});
  const [showTags, setShowTags] = useState(false);
  const profileVisibilitiesOptions = PROFILE_VISIBILITIES.map(opt => ({ value: opt.value, label: opt.visibleFor }));

  const handleClose = () => {
    helperStore.setCreatePostOptions(null);
  };

  const handleUploadImages = (e) => {
    const { files } = e.target;
    store.uploadFiles(files, 'image');
  };

  const handleUploadVideos = (e) => {
    const { files } = e.target;
    store.uploadFiles(files, 'video');
  };

  const handleAutocompliteTags = () => {
    const tagList = getTagListByKeywords(post.content).map(item => item.name);
    const unique = new Set([...post.tagList, ...tagList]);
    store.handleChangeOption({ name: 'tagList', value: [...unique] });
  };

  const handleChangeContent = (html: any, pureText: any) => {
    store.handleChangeOption({ name: 'content', value: html });
    store.handleChangeOption({ name: 'contentText', value: pureText });
  };

  const handleChangeReply = (html: any, pureText: any) => {
    store.handleChangeOption({ name: 'reply', value: html });
    store.handleChangeOption({ name: 'replyText', value: pureText });
  };

  const toggleTag = (tag) => {
    const tagList = [...post.tagList];
    const idx = tagList.indexOf(tag.name);
    if (idx === -1) {
      tagList.push(tag.name);
    } else {
      tagList.splice(idx, 1);
    }
    store.handleChangeOption({ name: 'tagList', value: tagList });
  };

  const handleInputKeyPress = (e: any) => {
    if (e && e.key === ' ') handleAutocompliteTags();
  };

  const adjustVisibilityToUserProfile = () => {
    if (currentUser && currentUser.visibility) {
      store.setDefaultVisibility(currentUser.visibility);
      store.handleChangeOption({ name: 'visibility', value: currentUser.visibility });
    }
  };

  const adjustTagListToRepostData = () => {
    if (repostData.post) {
      store.handleChangeOption({ name: 'tagList', value: repostData.post.tagList });
    }
  };

  const handleSubmit = () => {
    if (mode === 'ask' && post.reply) {
      store.handleChangeOption({ name: 'reply', value: '' });
    }
    store.savePost(location, repostData).then((savedPost) => {
      if (savedPost) {
        setShowTags(false);
        setSuccessModalOptions({
          show: true,
          isRepost: !!repostData.post,
          postId: savedPost.id,
          editMode
        });
        adjustVisibilityToUserProfile();
        handleClose();
        if (createPostOptions.onSuccess) createPostOptions.onSuccess(savedPost);
      }
    });
  };

  useEffect(() => {
    adjustVisibilityToUserProfile();
  }, [currentUser]);

  useEffect(() => {
    adjustTagListToRepostData();
  }, [repostData]);

  useEffect(() => {
    store.setPostData(editMode ? createPostOptions.post : null);
  }, [editMode]);

  return (
    <>
      <Modal
        auth
        xl
        open={showModal}
        onClose={handleClose}
      >
        <S.Wrap>

          <S.Header>
            {!editMode ?
              <Switch
                options={modes}
                value={mode}
                onChange={newMode => store.setMode(newMode)}
              />
              :
              <S.Title>
                Edit your question
              </S.Title>}
          </S.Header>
          <S.Close onClick={handleClose} />

          <S.ActionItem
            flexGrow={mode === 'ask' ? 1 : 0}
            border={mode !== 'ask'}
          >
            <TextFieldFormatted
              placeholder={mode === 'ask' ? `What’s on your mind, ${getUserName(currentUser, false, true)}?` : 'Title'}
              name="content"
              size={mode === 'ask' ? 250 : 40}
              value={post.content || ''}
              onChange={handleChangeContent}
              onBlur={handleAutocompliteTags}
              onKeyPress={handleInputKeyPress}
              error={validationErrors.contentText}
            />
          </S.ActionItem>

          {mode === 'give' && <S.ActionItem divider flexGrow={1}>
            <TextFieldFormatted
              highlight={['hashtags', 'mentions']}
              name="reply"
              size={250}
              placeholder={`What’s on your mind, ${getUserName(currentUser, false, true)}?`}
              value={post.reply || ''}
              onChange={handleChangeReply}
              error={validationErrors.replyText}
            />
          </S.ActionItem>}

          <S.TagListWrap>
            <S.TagList border={showTags}>
              {(post.tagList.length || showTags) ?
                tags.map(tag => (
                  <S.Tag key={tag.id}
                    tag={tag}
                    active={post.tagList.includes(tag.name)}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag.name}
                  </S.Tag>
                ))
                :
                <RoundedButton transparent onClick={() => setShowTags(true)}>
                  <IconTopicFollow/> Add Categories
                </RoundedButton>}
            </S.TagList>
            {validationErrors.tagList && <S.Error>{validationErrors.tagList}</S.Error>}
          </S.TagListWrap>

          {(repostData.post) && <S.RepostRow>
            <PostCard reposted post={{ ...repostData.post, replies: repostData.reply ? [repostData.reply] : [] }} />
          </S.RepostRow>}

          <S.Footer>

            {(!!uploadingFiles.length || !!album.length) &&
              <S.UploadingFiles>
                {album.filter(media => !deletedMedia.includes(media)).map((media) => {
                  const isVideo = media.type === 'videos';
                  return (
                    <FileUploader
                      key={media.id}
                      backdrop={false}
                      file={{
                        ...media,
                        uploaded: true,
                        fileType: !isVideo ? 'image' : 'video',
                        src: !isVideo ? media.url : media.videoUrl
                      }}
                      onDelete={() => store.handleDeleteMedia(media)}
                    />
                  );
                })}
                {uploadingFiles.map((file) => (
                  <FileUploader key={file.id}
                    backdrop
                    file={file}
                    onSuccessUpload={result => store.handleFileUploaded(file.id, result)}
                    onDelete={() => store.handleDeleteFile(file.id)}
                  />
                ))}
              </S.UploadingFiles>}
            <S.ButtonWrap>
              <S.UploadFile>
                <Button file>
                  <label htmlFor="createPostImgUpload">
                    <IconPhoto />
                    <input multiple
                      type="file"
                      accept="image/*"
                      id="createPostImgUpload"
                      onChange={handleUploadImages}
                    />
                  </label>
                </Button>

                <Button file>
                  <label htmlFor="createPostVideoUpload">
                    <IconVideo />
                    <input multiple
                      type="file"
                      accept="video/*"
                      id="createPostVideoUpload"
                      onChange={handleUploadVideos}
                    />
                  </label>
                </Button>
              </S.UploadFile>
            </S.ButtonWrap>

            <S.Select
              label="Who can see my post:"
              primary
              fulltext
              isSearchable={false}
              name="visibility"
              placeholder="Visibility"
              options={profileVisibilitiesOptions}
              value={post.visibility ? profileVisibilitiesOptions.find(t => t.value === post.visibility) : ''}
              onChange={item => store.handleChangeOption({ name: 'visibility', value: item.value })}
            />

            <Checkbox
              name="type"
              title="Post Anonymously"
              checked={post.authorVisibility === 'anonymous'}
              onChange={() => store.handleChangeOption({ name: 'authorVisibility', value: (post.authorVisibility === 'public') ? 'anonymous' : 'public' })}
            />

            <S.PostButton>
              <RoundedButton primary onClick={handleSubmit}>
                {editMode ? 'SAVE' : 'POST'}
              </RoundedButton>
            </S.PostButton>

          </S.Footer>
          {loading && <Preloader position="fixed" backdrop />}
        </S.Wrap>
      </Modal>

      <SuccessModal
        {...successModalOptions}
        show={!!successModalOptions.show}
        onClose={() => setSuccessModalOptions({})}
      />
    </>
  );

};

export default observer(CreatePostModal);
