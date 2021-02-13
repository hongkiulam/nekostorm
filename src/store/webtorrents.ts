import type { WebTorrentIdMap } from "src/types/torrent";
import type { WindowWithContextBridge } from "src/types/window";
import { readable } from "svelte/store";

export const webtorrents = readable<WebTorrentIdMap>({}, (set) => {
  (window as WindowWithContextBridge).wt.progress((torrentIdMap) => {
    set(torrentIdMap);
  });
});
