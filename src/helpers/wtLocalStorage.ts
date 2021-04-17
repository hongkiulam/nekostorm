// helper functions for setting localstorage in webtorrent renderer process

import { wtLocalStorage } from './ipc';

export default {
  set: (key: string, value: string) => {
    wtLocalStorage.setItem(key, value);
  },
  get: (key: string): Promise<string> => {
    return new Promise((res, rej) => {
      wtLocalStorage.getItem(key, (value) => {
        res(value);
      });
    });
  },
};
