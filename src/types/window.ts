import type { WebTorrentIdMap } from "./torrent";

export type WindowWithContextBridge = Window &
  typeof globalThis & {
    api: {
      send: () => void;
      receive: () => void;
    };
    wt: {
      add: (magnet: string, id: number) => void;
      metadata: (id: number, received: () => void) => void;
      remove: (id: number, response: (err: string) => void) => void;
      progress: (listener: (torrentIdMap: WebTorrentIdMap) => void) => Function;
      save: (id: number, response: (err: string) => void) => void;
      pause: (
        magnet: string,
        id: number,
        response: (err: string) => void
      ) => void;
      resume: (
        magnet: string,
        id: number,
        response: (err: string) => void
      ) => void;
    };
  };
