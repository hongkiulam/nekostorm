// helper functions for setting localstorage in webtorrent renderer process

import type { WindowWithContextBridge } from "src/types/window";

export default {
  set: (key: string, value: string) => {
    (window as WindowWithContextBridge)["wt-localStorage"].setItem(key, value);
  },
  get: (key: string): Promise<string> => {
    return new Promise((res, rej) => {
      (window as WindowWithContextBridge)["wt-localStorage"].getItem(
        key,
        (value) => {
          res(value);
        }
      );
    });
  },
};
