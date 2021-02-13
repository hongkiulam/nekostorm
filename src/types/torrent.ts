import type WebTorrent from "webtorrent";
import type { APITorrent } from "./api";
export interface TorrentInstance {
  webTorrent?: WebTorrent.Torrent;
  searchResult: APITorrent;
  loading: boolean;
  added: number;
}
export interface Torrent {
  [id: number]: TorrentInstance;
}

export type TorrentStatus = "Loading" | "In Progress" | "Complete" | "Deleting";
