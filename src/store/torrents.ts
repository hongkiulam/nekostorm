import { get, writable } from "svelte/store";
import { /*electronStore,*/ wtClient } from "./basic";
import type { Torrent } from "../types/torrent";
import type { APITorrent } from "../types/api";

const useTorrents = () => {
  const torrents = writable<Torrent>({});
  // electronStore.get("torrents") as Torrent[]
  const add = (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: { searchResult: torrent, loading: true, added: Date.now() },
    }));
    // wtClient.add(torrent.magnet, (webtorrent) => {
    //   torrents.update((old) => ({
    //     ...old,
    //     [torrent.id]: {
    //       ...old[torrent.id],
    //       webTorrent: webtorrent,
    //       loading: false,
    //     },
    //   }));
    // });
  };
  const remove = (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: {
        ...old[torrent.id],
        loading: true,
      },
    }));
    // wtClient.remove(torrent.magnet, {}, (err) => {
    //   const { [torrent.id]: _, ...rest } = get(torrents);
    //   torrents.set(rest);
    // });
  };
  const exists = (id: number) => {
    const found = wtClient.get(id);
    return found;
  };
  // initialise with torrents from electron store
  // const fromStore = electronStore.get("torrents") as NyaaTorrent[];
  // fromStore.forEach(add);

  // sync up electron-store with torrents store
  torrents.subscribe((t) => {
    // only save searchResult obj containing id and magnet etc...
    const savedTorrents = Object.values(t).map((x) => x.searchResult);
    // electronStore.set("torrents", savedTorrents);
    console.log("TorrentsUpdated", savedTorrents);
  });

  return {
    ...torrents,
    add,
    remove,
    exists,
  };
};
export const torrents = useTorrents();
