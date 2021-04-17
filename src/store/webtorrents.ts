import type { WebTorrent, WebTorrentIdMap } from 'src/types/torrent';
import { wt } from '../helpers/ipc';
import { readable, writable } from 'svelte/store';

export const webtorrents = readable<WebTorrentIdMap>({}, (set) => {
  wt.progress((torrentIdMap) => {
    set(torrentIdMap);
  });
});

export const webtorrentsOverTime = writable<{
  [torrentId: number]: WebTorrent[];
}>({});

webtorrents.subscribe((webtorrentIdMap) => {
  for (const torrentId in webtorrentIdMap) {
    const wt = webtorrentIdMap[torrentId];
    webtorrentsOverTime.update((old) => {
      return {
        ...old,
        [torrentId]: [...(old[torrentId] || []), wt],
      };
    });
  }
});
