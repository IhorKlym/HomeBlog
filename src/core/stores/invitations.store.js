// @flow

import { configure } from 'mobx';
import invitationsApi from 'api/invitations.api';
import toaster from 'services/toaster';
import { keysCamelToSnake } from 'helpers/methods';

configure({ enforceActions: 'observed' });

class InvitationsStore {

  inviteViaEmail = (email: string) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await invitationsApi.inviteViaEmail(email);
      toaster.updated('Invitation is successfully sent!', {}, 'success');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

  inviteViaText = (phone: string) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await invitationsApi.inviteViaText(phone);
      toaster.updated('Invitation is successfully sent!', {}, 'success');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

  getGoogleContacts = (requestData: any) => new Promise<any>(async (resolve, reject) => {
    try {
      const { data } = await invitationsApi.getGoogleContacts(keysCamelToSnake(requestData));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

}

export default new InvitationsStore();
