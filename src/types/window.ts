import type WebTorrent from "webtorrent";

export type WindowWithContextBridge = Window &
  typeof globalThis & {
    api: {
      send: () => void;
      receive: () => void;
    };
    wt: {
      add: (magnet: string, callbacks: WebTorrentCallbacks) => void;
      remove: () => void;
    };
  };

interface WebTorrentCallbacks {
  download?: (webtorrent: WebTorrent.Torrent) => void;
  done?: () => void;
  metadata?: (webtorrent: WebTorrent.Torrent) => void;
}
