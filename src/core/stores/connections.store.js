// @flow

import { observable, flow, configure, action, runInAction, computed } from 'mobx';
import connectionsApi from 'api/connections.api';
import searchesApi from 'api/searches.api';
import usersApi from 'api/users.api';
import toaster from 'services/toaster';
import { setInObservable, getUserName } from 'helpers/methods';
import helperStore from './helper.store';
import sessionStore from './session.store';

configure({ enforceActions: 'observed' });

class ConnectionsStore {
  @observable loading: boolean = false;
  @observable pendingRequests: any[] = [];
  @observable usersMentionsMap: any = new Map();
  @observable errors: [] = [];

  @computed get usersMentions() {
    return Array.from<any>(this.usersMentionsMap.values()) || [];
  }

  findUsersMentions(q: string) {
    let arr: any = this.usersMentions;
    if (q) {
      const query = q.toLowerCase();
      arr = arr.filter(item => {
        if (item.firstName && item.firstName.toLowerCase().includes(query)) return true;
        if (item.lastName && item.lastName.toLowerCase().includes(query)) return true;
        if (item.businessName && item.businessName.toLowerCase().includes(query)) return true;
        return false;
      });
    }
    return arr;
  }

  getMyConnections = flow(function* fetch(params: any) {
    try {
      const { data } = yield usersApi.fetchMyConnections(params);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  })

  getUserConnections = flow(function* fetch(userId: any, params: any) {
    try {
      const { data } = yield usersApi.fetchConnections(userId, params);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  })

  getMutualConnections = flow(function* fetch(userId: any, params: any) {
    try {
      const { data } = yield connectionsApi.getMutualConnections(userId, params);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  })

  getSuggestedConnections = flow(function* fetch(params: any) {
    try {
      const { data } = yield searchesApi.fetchSuggestedConnections(params);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  })

  fetchUsersMentions = flow(function* fetch() {
    try {
      const { data } = yield searchesApi.fetchUsersMentions();
      this.usersMentionsMap.clear();
      data.forEach(item => {
        this.usersMentionsMap.set(item.id, item);
      });
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  })

  @action.bound
  addUsersMention(item: any) {
    this.usersMentionsMap.set(item.id, item);
  }

  @action.bound
  deleteUsersMention(item: any) {
    this.usersMentionsMap.delete(item.id);
  }

  getPendingRequests = flow(function* fetch(params: any) {
    this.loading = true;
    try {
      const { data } = yield connectionsApi.getPendingRequests(params);
      this.pendingRequests = data;
      this.loading = false;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  createRequest = (user: any) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await connectionsApi.createRequest(user);
      toaster.updated('Request was send successfully!', {}, 'success');
      if (data.id) {
        runInAction(() => {
          setInObservable(user, 'isSendRequest', true);
        });
        helperStore.generateAppEvent({
          type: 'REQUEST:SENT',
          payload: {
            target: user
          }
        });
      }
      resolve(data);
    } catch (error) {
      toaster.notify(error);
      reject(error);
    }
  })

  acceptRequest = (user: any) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await connectionsApi.acceptRequest(user);
      toaster.updated('Request was accepted!', {}, 'success');
      if (data.id) {
        runInAction(() => {
          setInObservable(user, 'levelOfConnect', 1);
          setInObservable(user, 'isReceiveRequest', false);
          const { currentUser } = sessionStore;
          if (currentUser) setInObservable(currentUser, 'connectionsCount', (currentUser.connectionsCount + 1));
        });
        helperStore.generateAppEvent({
          type: 'REQUEST:ACCEPT',
          payload: {
            target: user
          }
        });
        this.fetchUsersMentions();
      }
      resolve(data);
    } catch (error) {
      toaster.notify(error);
      reject(error);
    }
  })

  declineRequest = (user: any) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await connectionsApi.declineRequest(user);
      toaster.updated('Request was declined!', {}, 'success');
      if (data.id) {
        runInAction(() => {
          setInObservable(user, 'isReceiveRequest', false);
        });
        helperStore.generateAppEvent({
          type: 'REQUEST:DECLINE',
          payload: {
            target: user
          }
        });
      }
      resolve(data);
    } catch (error) {
      toaster.notify(error);
      reject(error);
    }
  })

  disconnect = flow(function* fetch(user: any) {
    this.loading = true;
    try {
      yield connectionsApi.disconnect(user);
      toaster.updated(`You have successfully deleted ${getUserName(user)} from your connections`, {}, 'success');
      setInObservable(user, 'levelOfConnect', 0);
      const { currentUser } = sessionStore;
      if (currentUser) setInObservable(currentUser, 'connectionsCount', (currentUser.connectionsCount - 1));
      helperStore.generateAppEvent({
        type: 'CONNECTIONS:DISCONNECT',
        payload: {
          target: user
        }
      });
      this.loading = false;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
    }
  })

  followUser = flow(function* fetch(user: any) {
    const { id, isFollowed } = user;
    try {
      const request = isFollowed ? usersApi.unfollowUser : usersApi.followUser;
      const { data } = yield request(id);
      const nowFollowed = !isFollowed;
      setInObservable(user, 'isFollowed', nowFollowed);
      if (nowFollowed) this.addUsersMention(user);
      else if (user.levelOfConnect !== 1) this.deleteUsersMention(user);
      return data;
    } catch (e) {
      return e;
    }
  })
}

export default new ConnectionsStore();
