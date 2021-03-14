import type { APITorrent } from "./api";
export interface TorrentInstance {
  searchResult: APITorrent;
  loading: boolean;
  added: number;
  saveState: "notsaved" | "saving" | "saved";
  pauseState: "running" | "pausing" | "paused" | "resuming";
}
export interface Torrent {
  [id: number]: TorrentInstance;
}

export interface WebTorrentIdMap {
  [key: number]: WebTorrent;
}
export interface WebTorrent {
  downloadSpeed: number;
  uploadSpeed: number;
  downloaded: number;
  numPeers: number;
  files: {
    done: boolean;
    length: number;
    name: string;
  }[];
  length: number;
  done: boolean;
  timeRemaining: number;
}
