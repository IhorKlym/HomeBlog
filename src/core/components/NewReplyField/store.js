// @flow

import { observable, action, configure, runInAction } from 'mobx';
import { generateUUID } from 'helpers/methods';

const defaultReplyData = {
  content: '',
  visibility: 'public',
  authorVisibility: 'public'
};

configure({ enforceActions: 'observed' });

class NewReplyStore {
  @observable loading: boolean = false;
  @observable defaultReplyData: any = { ...defaultReplyData };
  @observable reply: any = { ...defaultReplyData };
  @observable uploadingFiles: any[] = [];
  @observable deletedMedia: any[] = [];
  @observable errors: [] = [];

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
  setDefaultVisibility(visibility: any) {
    this.defaultReplyData.visibility = visibility;
  }

  @action.bound
  setReplyData(reply: any) {
    this.reply = reply || { ...this.defaultReplyData };
    this.uploadingFiles = [];
    this.deletedMedia = [];
  }

  @action.bound
  handleChange({ target: { name, value } }: { target: HTMLInputElement }) {
    this.reply[name] = value;
  }

  @action.bound
  handleChangeOption({ name, value }: { name: string, value: any }) {
    this.reply[name] = value;
  }

  getCurrentReplyData() {
    return {
      ...this.reply,
      uploadingFiles: [...this.uploadingFiles],
      deletedMedia: [...this.deletedMedia]
    };
  };
}

export default NewReplyStore;
