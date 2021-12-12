// @flow

import { observable, configure, flow } from 'mobx';
import profileApi from 'api/profile.api';

configure({ enforceActions: 'observed' });

class AccountTypeFormStore {
  @observable loading: boolean = false;

  completeStep = flow(function* fetch(user: any) {
    this.loading = true;
    try {
      const { data } = yield profileApi.updateProfile(user);
      this.loading = false;
      return data;

    } catch (error) {
      this.loading = false;
    }
  });

  getAccessibleStep = (stepper: any[], user: any) => {
    let accesible = 0;
    for (let i = 0; i < stepper.length; i += 1) {
      const step = stepper[i];
      const valid = step.optional || step.checkIsCompleted(user);
      if (valid) {
        accesible = i + 1;
      } else {
        break;
      }
    }
    return accesible;
  };
}

export default new AccountTypeFormStore();
