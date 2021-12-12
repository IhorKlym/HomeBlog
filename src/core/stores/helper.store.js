// @flow

import { observable, action, configure, runInAction } from 'mobx';

configure({ enforceActions: 'observed' });

class HelperStore {
  @observable showLoginModal: boolean = false;
  @observable showGlobalSearchBar: boolean = false;
  @observable createPostOptions: any = null;
  @observable galleryAlbum: any[] = [];
  @observable appEvent: any = null;

  @action.bound
  setShowLoginModal(show: boolean) {
    this.showLoginModal = show;
  }

  @action.bound
  setCreatePostOptions(options: any) {
    this.createPostOptions = options;
  }

  @action.bound
  setShowGlobalSearchBar(show: boolean) {
    this.showGlobalSearchBar = show;
  }

  @action.bound
  setGalleryAlbum(album: any[]) {
    this.galleryAlbum = album;
  }

  @action.bound
  generateAppEvent(event: { type: string, payload: ?any }) {
    this.appEvent = event;
    setTimeout(() => {
      runInAction(() => {
        this.appEvent = null;
      });
    }, 0);
  }
}

export default new HelperStore();
