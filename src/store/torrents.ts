import { get, writable } from "svelte/store";
import type { Torrent } from "../types/torrent";
import type { APITorrent } from "../types/api";
import { isElectron } from "../helpers/isElectron";
import type WebTorrent from "webtorrent";
import type { WindowWithContextBridge } from "src/types/window";

const useTorrents = () => {
  const torrents = writable<Torrent>({});
  // electronStore.get("torrents") as Torrent[]
  const add = (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: { searchResult: torrent, loading: true, added: Date.now() },
    }));
    if (isElectron()) {
      (window as WindowWithContextBridge).wt.add(torrent.magnet);
    }
  };
  const remove = (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: {
        ...old[torrent.id],
        loading: true,
      },
    }));
  };
  const exists = (id: number) => {
    const found = !!get(torrents)[id];
    return found;
  };

  torrents.subscribe((t) => {
    // only save searchResult obj containing id and magnet etc...
    const savedTorrents = Object.values(t).map((x) => x.searchResult);
    console.log("TorrentsUpdated", savedTorrents);
  });

  return {
    ...torrents,
    add,
    remove,
    exists,
  };
};

const useWebTorrents = () => {
  const webtorrents = writable<{ [id: number]: WebTorrent.Torrent }>({});
  // electronStore.get("torrents") as Torrent[]
  const update = (torrentID: number, webtorrent: WebTorrent.Torrent) => {
    webtorrents.update((old) => {
      return {
        ...old,
        [torrentID]: webtorrent,
      };
    });
  };

  return {
    ...webtorrents,
    update,
  };
};

export const webtorrents = useWebTorrents();
export const torrents = useTorrents();
