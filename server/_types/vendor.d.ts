export interface NyaaPantsuTorrent {
  id: number;
  name: string;
  status: number;
  hash: string;
  date: Date;
  filesize: number;
  description: string;
  comments: any[];
  sub_category: string;
  category: string;
  anidbid: number;
  vndbid: number;
  vgmdbid: number;
  dlsite: string;
  videoquality: string;
  tags?: any;
  uploader_id: number;
  uploader_name: string;
  uploader_old: string;
  website_link: string;
  languages: string[];
  magnet: string;
  torrent: string;
  seeders: number;
  leechers: number;
  completed: number;
  last_scrape: string;
  file_list: any[];
}

export interface NyaaSiTorrent {
  id: string;
  name: string;
  hash: string;
  date: Date;
  filesize: string;
  category?: string;
  sub_category?: string;
  magnet: string;
  torrent: string;
  seeders: string;
  leechers: string;
  completed?: string;
  status: "danger" | "success" | "default";
}

export interface AnimeToshoTorrent {
  id: number;
  title: string;
  link: string;
  timestamp: number;
  status: "processing" | "complete";
  tosho_id: number;
  nyaa_id?: any;
  nyaa_subdom?: any;
  anidex_id?: any;
  torrent_url: string;
  torrent_name: string;
  info_hash: string;
  info_hash_v2?: any;
  magnet_uri: string;
  seeders?: any;
  leechers?: any;
  nzb_url: string;
  total_size: number;
  num_files: number;
  anidb_aid: number;
  anidb_eid: number;
  anidb_fid?: any;
  article_url?: any;
  article_title?: any;
  website_url: string;
}
