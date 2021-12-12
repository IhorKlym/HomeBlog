// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import ModalNotes from 'components/ModalNotes';

const getPortalElement = () => {
  const PORTAL_ID = 'toaster';
  const existingElement = document.getElementById(PORTAL_ID);

  if (existingElement) return existingElement;

  const portalElement = document.createElement('div');
  portalElement.id = PORTAL_ID;

  if (document.body != null) document.body.appendChild(portalElement);

  return portalElement;
};

class Toaster {
  createNotification: Function;

  constructor() {
    const portalElement = getPortalElement();
    ReactDOM.render(<ModalNotes notify={this.bindNotify} />, portalElement);
  }

  bindNotify = (fn: Function) => {
    this.createNotification = fn;
  };

  notify = (message: any, options: any = {}) => {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  };

  updated = (message: any, options: any = {}, status: string) => {
    if (this.createNotification) {
      this.createNotification(message, options, status);
    }
  };
}

export default new Toaster;
