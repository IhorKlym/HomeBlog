// @flow

import { observable, action, flow, configure, computed, set } from 'mobx';
import conversationsApi from 'api/conversations.api';
import conversationParticipantsApi from 'api/conversationParticipants.api';
import conversationMessagesApi from 'api/conversationMessages.api';

configure({ enforceActions: 'observed' });

class MessengerStore {
  @observable loading: boolean = false;
  @observable fetchPending: boolean = false;
  @observable page: number = 1;
  @observable offset: number = 0;
  @observable itemsCountOnPage: number = 10;
  @observable allConversationsMap: any = new Map();
  @observable conversations: any[] = [];
  @observable unreadConversations: any[] = [];
  @observable errors: any[] = [];
  @computed get allConversations() { return Array.from<any>(this.allConversationsMap.values()) || []; }
  @computed get totalConversationsCount() { return this.allConversationsMap.size || 0; }

  @action.bound
  clearConversations() {
    this.page = 1;
    this.offset = 0;
    this.allConversationsMap = new Map();
    this.conversations = [];
  };

  @action.bound
  loadMoreConversations() {
    try {
      this.conversations = this.allConversations.slice(0, this.page * this.itemsCountOnPage);
      this.page += 1;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
    }
  };
  
  @action.bound
  setLastMessageInConversation(conversationId: string, message: any) {
    const conversation = this.allConversationsMap.get(conversationId);
    if (conversation && conversation) {
      set(conversation, 'message', message);
    }
  };

  getConversations = flow(function* fetch(fetchMore: ?boolean, extendedParams: ?any) {
    if (fetchMore && this.fetchPending) return;
    this.fetchPending = true;
    if (!fetchMore) {
      this.loading = true;
      this.offset = 0;
    }
    try {
      const params = {
        ...(extendedParams || {}),
        page: {
          offset: this.offset,
          limit: this.offset === 0 ? 20 : 40
        }
      };
      const { data } = yield conversationsApi.getAllConversations(params);
      this.offset += data.length;

      if (fetchMore) {
        const merged = this.allConversations.concat(data);
        this.allConversationsMap = new Map();
        merged.forEach(conv => {
          this.allConversationsMap.set(conv.id, conv);
        });

      } else {
        this.page = 1;
        this.allConversationsMap = new Map();
        data.forEach(conv => {
          this.allConversationsMap.set(conv.id, conv);
        });
        this.loadMoreConversations();
      }

      this.loading = false;
      this.fetchPending = false;
      this.errors = [];
    } catch (error) {
      this.errors = error.errors;
      this.loading = false;
      this.fetchPending = false;
    }
  });

  getUnreadConversations = flow(function* fetch() {
    try {
      const params = {
        filter: {
          state: 'active',
          is_unread: true
        }
      };
      const { data } = yield conversationsApi.getAllConversations(params);
      this.errors = [];
      this.unreadConversations = data;
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  createConversation = flow(function* create(name: string, participants: ?any[]) {
    try {
      const { data: conversation } = yield conversationsApi.createConversation({ name });

      if (participants) {
        for (let i = 0; i < participants.length; i += 1) {
          yield conversationParticipantsApi.inviteParticipant(conversation.id, participants[i]);
        }
      }

      this.errors = [];
      return conversation;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  getConversation = flow(function* fetch(conversationId: any) {
    try {
      const { data } = yield conversationsApi.getConversation(conversationId);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  findConversationsByParticipants = flow(function* fetch(participants: any[], exact: ?boolean) {
    try {
      const params = {
        filter: {
          state: 'active',
          users_ids: `${participants.map(p => p.id).join(',')}|${exact ? 1 : 0}`
        }
      };
      const { data } = yield conversationsApi.getAllConversations(params);
      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  getConversationMessages = flow(function* fetch(conversationId: any, params: ?any = {}) {
    try {
      const { data } = yield conversationMessagesApi.getAllMessages(conversationId, params);

      this.errors = [];
      return data;
    } catch (error) {
      this.errors = error.errors;
    }
  });

  sendNewMessage = flow(function* create(conversationId: any, msg: string, params: any ) {
    try {
      const { data: message } = yield conversationMessagesApi.sendMessage(conversationId, msg, params);
      this.setLastMessageInConversation(conversationId, message);
      this.errors = [];
      return message;
    } catch (error) {
      this.errors = error.errors;
    }
  });

}

export default new MessengerStore();
