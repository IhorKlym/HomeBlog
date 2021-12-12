// @flow

import { observable, action, flow, configure, set } from 'mobx';
import postsApi from 'api/posts.api';
import repliesApi from 'api/replies.api';
import photosApi from 'api/photos.api';
import videosApi from 'api/videos.api';

configure({ enforceActions: 'observed' });

class PostScreenStore {
  @observable loading: boolean = false;
  @observable post: any = {};
  @observable errors: any[] = [];

  @action.bound
  clearStore() {
    this.post = {};
  }

  getPost = flow(function* fetch(postId: string) {
    this.loading = true;
    try {
      const params = {
        include: 'user.skin,photos,videos,repost.user.skin,repost.photos,repost.videos,repost_reply.user.skin'
      };
      const { data: post } = yield postsApi.getPost(postId, params);
      const repliesParams = {
        filter: { post_id: postId },
        page: { offset: 0, limit: 10 }
      };
      const { data: replies } = yield repliesApi.getReplies(repliesParams);
      post.replies = replies;

      this.post = post;
      this.errors = [];
      this.loading = false;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  followPost = flow(function* fetch(params: any) {
    const { id: dataKey, isFollowed } = params.post;
    this.loading = true;

    try {
      const request = isFollowed ? postsApi.unfollowPost : postsApi.followPost;
      const { data } = yield request(dataKey);
      set(params.post, 'isFollowed', !isFollowed);
      this.loading = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  }).bind(this);

  replyToPost = flow(function* fetch(params: any, query: ?any = {}) {
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
      this.errors = [];
      return reply;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  editReply = flow(function* fetch(params: any) {
    const { id, post, uploadingFiles, deletedMedia, ...replyData } = params;
    this.loading = true;
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
      this.loading = false;
      this.errors = [];
      return reply;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  loadMoreReplies = flow(function* moreReplies({ post, limit = 0 }: { post: any, limit: ?number }) {
    this.loading = true;
    try {
      const params = {
        filter: { post_id: post.id },
        page: { offset: post.replies.length, limit }
      };
      const { data } = yield repliesApi.getReplies(params);
      set(post, 'replies', [...post.replies, ...data]);
      this.loading = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  deletePost = flow(function* fetch(params: any) {
    const { post: { id } } = params;
    this.loading = true;
    try {
      const { data } = yield postsApi.deletePost(id);
      this.loading = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });

  deleteReply = flow(function* fetch(params: any) {
    const { post, reply: { id } } = params;
    this.loading = true;
    try {
      const { data } = yield repliesApi.deleteReply(id);
      const updatedReplies = [...post.replies];
      const idx = updatedReplies.findIndex(reply => reply.id === id);
      if (idx !== -1) {
        updatedReplies.splice(idx, 1);
        set(post, 'replies', updatedReplies);
        set(post, 'repliesCount', (post.repliesCount - 1));
      }
      this.loading = false;
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  });
}

export default new PostScreenStore();
