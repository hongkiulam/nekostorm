/**
 * Helper functions for interacting with torrent store
 */

import { torrents } from "../store/torrents";
import type { TorrentInstance } from "../types/torrent";

export const removeTorrent = (torrent: TorrentInstance) => {
  const remove = confirm(
    torrent.saveState === "saved"
      ? "Are you sure you want to remove this torrent? Saved data will not be removed"
      : "This action will remove the downloaded files, do you want to continue?"
  );
  if (remove) {
    torrents.remove(torrent.searchResult);
  }
};

export const toggleTorrentPause = (torrent: TorrentInstance) => {
  if (torrent.pauseState === "paused") {
    torrents.resume(torrent.searchResult);
  } else if (torrent.pauseState === "running") {
    torrents.pause(torrent.searchResult);
  }
};
