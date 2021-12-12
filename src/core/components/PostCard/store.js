// @flow

import { observable, flow, set, configure } from 'mobx';
import repliesApi from 'api/replies.api';
import postsApi from 'api/posts.api';
import photosApi from 'api/photos.api';
import videosApi from 'api/videos.api';

configure({ enforceActions: 'observed' });

class PostCardStore {
  @observable loadingMap: any = {};
  @observable errors: any[] = [];

  replyToPost = flow(function* fetch(params: any, query: ?any = {}) {
    const dataKey = params.post.id;
    this.loadingMap[dataKey] = true;
    try {
      const { data } = yield repliesApi.create(params, query);
      let reply = data;
      if (params.uploadingFiles && params.uploadingFiles.length) {
        for (let i = 0; i < params.uploadingFiles.length; i += 1) {
          const file = params.uploadingFiles[i];
          if (file.uploaded) {
            if (file.fileType === 'video') {
              yield videosApi.create({ ...file.uploaded, videoable: reply });
            } else {
              yield photosApi.create({ ...file.uploaded, imageable: reply });
            }
          }
        }
        const { data: updReply } = yield repliesApi.getReply(reply.id);
        reply = updReply;
      }
      set(params.post, 'replies', [...params.post.replies, reply]);
      set(params.post, 'repliesCount', (params.post.repliesCount + 1));
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return reply;
    } catch (error) {
      this.errors = error.errors;
      this.loadingMap[dataKey] = false;
    }
  });

  editReply = flow(function* fetch(params: any) {
    const { id, post, uploadingFiles, deletedMedia, ...replyData } = params;
    const dataKey = params.post.id;
    this.loadingMap[dataKey] = true;
    try {
      const { data } = yield repliesApi.update(id, replyData);
      let reply = data;
      if (uploadingFiles && uploadingFiles.length) {
        for (let i = 0; i < uploadingFiles.length; i += 1) {
          const file = uploadingFiles[i];
          if (file.uploaded) {
            if (file.fileType === 'video') {
              yield videosApi.create({ ...file.uploaded, videoable: reply });
            } else {
              yield photosApi.create({ ...file.uploaded, imageable: reply });
            }
          }
        }
      }
      if (deletedMedia && deletedMedia.length) {
        for (let i = 0; i < deletedMedia.length; i += 1) {
          const media = deletedMedia[i];
          const isVideo = media.type === 'videos';
          const api = isVideo ? videosApi : photosApi;
          yield api.delete(media);
        }
      }
      const { data: updReply } = yield repliesApi.getReply(reply.id);
      reply = updReply;

      const repliesClone = [...post.replies];
      const idx = repliesClone.findIndex(r => r.id === reply.id);
      if (idx !== -1) {
        repliesClone[idx] = reply;
        set(post, 'replies', repliesClone);
      }
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return reply;
    } catch (error) {
      this.errors = error.errors;
      this.loadingMap[dataKey] = false;
    }
  });

  loadMoreReplies = flow(function* moreReplies({ post, limit = 0 }: { post: any, limit: ?number }) {
    const dataKey = post.id;
    this.loadingMap[dataKey] = true;
    try {
      const params = {
        filter: { post_id: post.id },
        page: { offset: post.replies.length, limit }
      };
      const { data } = yield repliesApi.getReplies(params);
      set(post, 'replies', [...post.replies, ...data]);
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loadingMap[dataKey] = false;
    }
  });

  followPost = flow(function* fetch(params: any) {
    const { id: dataKey, isFollowed } = params.post;
    this.loadingMap[dataKey] = true;
    try {
      const request = isFollowed ? postsApi.unfollowPost : postsApi.followPost;
      const { data } = yield request(dataKey);
      set(params.post, 'isFollowed', !isFollowed);
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loadingMap[dataKey] = false;
    }
  });

  deletePost = flow(function* fetch(params: any) {
    const { post } = params;
    const { id: dataKey } = post;
    this.loadingMap[dataKey] = true;
    try {
      const { data } = yield postsApi.deletePost(dataKey);
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loadingMap[dataKey] = false;
    }
  });

  deleteReply = flow(function* fetch(params: any) {
    const { post, reply: { id } } = params;
    const { id: dataKey } = post;
    this.loadingMap[dataKey] = true;
    try {
      const { data } = yield repliesApi.deleteReply(id);
      const updatedReplies = [...post.replies];
      const idx = updatedReplies.findIndex(reply => reply.id === id);
      if (idx !== -1) {
        updatedReplies.splice(idx, 1);
        set(post, 'replies', updatedReplies);
        set(post, 'repliesCount', (post.repliesCount - 1));
      }
      this.loadingMap[dataKey] = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.loadingMap[dataKey] = false;
      this.loading = false;
    }
  });
}

export default new PostCardStore();
