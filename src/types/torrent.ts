import type WebTorrent from "webtorrent";
import type { APITorrent } from "./api";
export interface TorrentInstance {
  searchResult: APITorrent;
  loading: boolean;
  added: number;
}
export interface Torrent {
  [id: number]: TorrentInstance;
}

export interface WebTorrentIdMap {
  [key: number]: {
    downloadSpeed: number;
    uploadSpeed: number;
    downloaded: number;
    numPeers: number;
    files: {
      done: boolean;
      length: number;
      name: string;
    };
    length: number;
    done: boolean;
  };
}
