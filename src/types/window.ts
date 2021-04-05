import type { APITorrent } from './api';
import type { QueryObject } from './query';
import type { WebTorrentIdMap } from './torrent';

export type WindowWithContextBridge = Window &
  typeof globalThis & {
    api: {
      fetch: (queryObj: QueryObject) => Promise<APITorrent[] | undefined>;
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
      requestSavePath: () => string | undefined;
      subscribeDirectSave: (
        listener: (torrentKey: number, err: string) => void
      ) => void;
      stream: (
        id: number,
        fileIndex: number,
        response: (streamUrl: string) => void
      ) => void;
    };
    'wt-localStorage': {
      setItem: Storage['setItem'];
      getItem: (key: string, received: (value: string) => void) => void;
    };
  };
