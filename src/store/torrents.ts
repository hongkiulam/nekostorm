import { get, writable } from "svelte/store";
import type { Torrent } from "../types/torrent";
import type { APITorrent } from "../types/api";
import { isElectron } from "../helpers/isElectron";
import type { WindowWithContextBridge } from "src/types/window";
import { toasts } from "./toasts";

const torrentStorageKey = "nekostorm-torrents";

const useTorrents = () => {
  const torrents = writable<Torrent>({});
  const torrentsFromStorage: APITorrent[] = JSON.parse(
    localStorage.getItem(torrentStorageKey) || "[]"
  );

  const add = (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: {
        searchResult: torrent,
        loading: true,
        added: Date.now(),
        saved: false,
      },
    }));
    if (isElectron()) {
      (window as WindowWithContextBridge).wt.add(torrent.magnet, torrent.id);
      (window as WindowWithContextBridge).wt.metadata(torrent.id, () => {
        torrents.update((old) => ({
          ...old,
          [torrent.id]: {
            ...old[torrent.id],
            loading: false,
          },
        }));
      });
      toasts.add({
        label: `Torrent queued ${torrent.name}`,
        kind: "success",
      });
    }
  };
  const remove = (torrent: APITorrent) => {
    const { [torrent.id]: removed, ...rest } = get(torrents);
    torrents.update(() => rest);
    if (isElectron()) {
      (window as WindowWithContextBridge).wt.remove(torrent.id);
      toasts.add({
        label: `Torrent removed ${torrent.name}`,
        kind: "danger",
      });
    }
  };

  const exists = (id: number) => {
    const found = !!get(torrents)[id];
    return found;
  };

  const save = (id: number) => {
    (window as WindowWithContextBridge).wt.save(id, () => {
      torrents.update((old) => ({
        ...old,
        [id]: {
          ...old[id],
          saved: true,
        },
      }));
    });
  };

  torrents.subscribe((t) => {
    // only save searchResult obj containing id and magnet etc...
    const savedTorrents = Object.values(t).map((x) => x.searchResult);
    // localStorage.setItem(torrentStorageKey, JSON.stringify(savedTorrents));
    console.log("TorrentsUpdated", savedTorrents);
  });

  torrentsFromStorage.forEach((torrent) => {
    add(torrent);
  });

  return {
    ...torrents,
    add,
    remove,
    exists,
    save,
  };
};

export const torrents = useTorrents();
