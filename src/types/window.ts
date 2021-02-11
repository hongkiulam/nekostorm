import type WebTorrent from "webtorrent";

export type WindowWithContextBridge = Window &
  typeof globalThis & {
    api: {
      send: () => void;
      receive: () => void;
    };
    wt: {
      add: (magnet: string) => void;
      remove: () => void;
    };
  };
