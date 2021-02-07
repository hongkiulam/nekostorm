import type { OriginalTorrent } from "./vendor";

export interface APITorrent {
  id: number;
  name: string;
  hash: string;
  date: string; // ISO string
  filesize: string;
  category?: string;
  sub_category?: string;
  magnet: string;
  torrent: string;
  seeders: string;
  leechers: string;
  description?: string;
  source: "nyaasi" | "nyaapantsu" | "anidex" | "tokyotosho";
  original: OriginalTorrent;
}
