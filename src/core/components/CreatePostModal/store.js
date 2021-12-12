// @flow

import { observable, action, flow, configure, runInAction, set } from 'mobx';
import Validate from 'services/validation';
import postApi from 'api/posts.api';
import repliesApi from 'api/replies.api';
import photosApi from 'api/photos.api';
import videosApi from 'api/videos.api';
import homeScreenStore from 'screens/NewsfeedScreen/store';
import profileScreenStore from 'screens/ProfileScreen/store';
import { generateUUID } from 'helpers/methods';

const fieldsToValidate = {
  contentText: 'presence',
  tagList: 'select'
};

const defaultPostData = {
  content: '',
  reply: '',
  tagList: [],
  visibility: 'public',
  authorVisibility: 'public'
};

const MODES = [
  { label: 'Ask Question', value: 'ask' },
  { label: 'Give Advice', value: 'give' }
];

configure({ enforceActions: 'observed' });

class CreatePostStore {
  @observable loading: boolean = false;
  @observable modes: any = MODES;
  @observable mode: any = MODES[0].value;
  @observable defaultPostData: any = { ...defaultPostData };
  @observable post: any = { ...defaultPostData };
  @observable uploadingFiles: any[] = [];
  @observable deletedMedia: any[] = [];
  @observable formTouched: boolean = false;
  @observable validationErrors: any = {};
  @observable errors: [] = [];
  @observable isValid: boolean = false;

  @action.bound
  uploadFiles(files: any[], type: string) {

    const addFile = file => {
      runInAction(() => {
        const clone = this.uploadingFiles.slice(0);
        clone.push(file);
        this.uploadingFiles = clone;
      });
    };

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      file.id = generateUUID();
      file.fileType = type;

      if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          file.src = e.target.result;
          addFile(file);
        };
        reader.readAsDataURL(file);
      } else

      if (type === 'video') {
        file.src = URL.createObjectURL(file);
        addFile(file);
      }
    }
  }

  @action.bound
  handleFileUploaded(fileId: any, result: any) {
    const clone = this.uploadingFiles.slice(0);
    const file = clone.find(f => f.id === fileId);
    if (file) file.uploaded = result;
    this.uploadingFiles = clone;
  }

  @action.bound
  handleDeleteFile(fileId: any) {
    const clone = this.uploadingFiles.slice(0);
    const file = clone.find(f => f.id === fileId);
    const idx = clone.indexOf(file);
    if (idx > -1) clone.splice(idx, 1);
    this.uploadingFiles = clone;
  }

  @action.bound
  handleDeleteMedia(media: any) {
    this.deletedMedia = [...this.deletedMedia, media];
  }

  @action.bound
  validateForm() {
    if (this.formTouched) {
      const validator = this.mode !== 'give' ? fieldsToValidate : { ...fieldsToValidate, replyText: 'presence' };
      const { isValid, errors } = Validate(this.post, validator);
      this.isValid = isValid;
      this.validationErrors = errors || {};
    }
  }

  @action.bound
  setDefaultVisibility(visibility: any) {
    this.defaultPostData.visibility = visibility;
  }

  @action.bound
  setPostData(post: any) {
    this.post = post || { ...this.defaultPostData };
    this.mode = MODES[0].value;
    this.deletedMedia = [];
  }

  @action.bound
  handleChange({ target: { name, value } }: { target: HTMLInputElement }) {
    this.post[name] = value;
    this.validateForm();
  }

  @action.bound
  setMode(mode: string) {
    this.mode = mode;
  }

  @action.bound
  handleChangeOption({ name, value }: { name: string, value: any }) {
    this.post[name] = value;
    this.validateForm();
  }

  handleFetchPosts = (location: ?any) => {
    const path = (location && location.pathname) || '';
    if (path.includes('/newsfeed')) {
      homeScreenStore.fetchNewsfeed();
    } else if (path.includes('/me')) {
      profileScreenStore.fetchActivity();
    }
  }

  savePost = flow(function* fetch(location: any, repostData: any = {}) {
    this.loading = true;
    this.formTouched = true;
    const validator = this.mode !== 'give' ? fieldsToValidate : { ...fieldsToValidate, replyText: 'presence' };
    const { isValid, errors } = Validate(this.post, validator);

    try {
      if (!isValid) throw (errors);
      let post;

      if (this.post.id) {
        const { data } = yield postApi.update(this.post.id, { ...this.post });
        post = data;
        
      } else if (repostData.reply) {
        const { data } = yield postApi.repostReply(repostData.reply.id, { ...this.post });
        post = data;

      } else if (repostData.post) {
        const { data } = yield postApi.repost(repostData.post.id, { ...this.post });
        post = data;

      } else {
        const { data } = yield postApi.create({ ...this.post });
        post = data;
      }

      if (this.post.reply) {
        const params = {
          post,
          content: this.post.reply,
          visibility: this.post.visibility,
          authorVisibility: this.post.authorVisibility
        };
        yield repliesApi.create(params);
      }

      for (let i = 0; i < this.uploadingFiles.length; i += 1) {
        const file = this.uploadingFiles[i];
        if (file.uploaded) {
          if (file.fileType === 'video') {
            yield videosApi.create({ ...file.uploaded, videoable: post });
          } else {
            yield photosApi.create({ ...file.uploaded, imageable: post });
          }
        }
      }

      for (let i = 0; i < this.deletedMedia.length; i += 1) {
        const media = this.deletedMedia[i];
        const isVideo = media.type === 'videos';
        const api = isVideo ? videosApi : photosApi;
        yield api.delete(media);
        const clone = this.post[media.type] || [];
        const idx = clone.findIndex(m => m.id === media.id);
        if (idx !== -1) {
          clone.splice(idx, 1);
          set(this.post, media.type, clone);
        }
      }

      this.loading = false;
      this.formTouched = false;
      this.post = { ...this.defaultPostData };
      this.uploadingFiles = [];
      this.deletedMedia = [];
      this.validationErrors = {};
      this.errors = [];
      setTimeout(() => this.handleFetchPosts(location), 500);
      return post;
    } catch (error) {
      this.validationErrors = errors || {};
      this.errors = error.errors;
      this.loading = false;
    }
  });
}

export default new CreatePostStore();
