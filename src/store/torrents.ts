import { get, writable } from "svelte/store";
import type { Torrent, TorrentInstance } from "../types/torrent";
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

  const _updateTorrentById = (
    torrentId: number,
    newState: Partial<TorrentInstance>
  ) => {
    torrents.update((old) => ({
      ...old,
      [torrentId]: {
        ...old[torrentId],
        ...newState,
      },
    }));
  };

  const add = async (torrent: APITorrent) => {
    torrents.update((old) => ({
      ...old,
      [torrent.id]: {
        searchResult: torrent,
        loading: true,
        added: Date.now(),
        saveState: "notsaved",
        pauseState: "running",
      },
    }));
    if (isElectron()) {
      (window as WindowWithContextBridge).wt.add(torrent.magnet, torrent.id);
      (window as WindowWithContextBridge).wt.metadata(torrent.id, () => {
        _updateTorrentById(torrent.id, { loading: false });
      });
      toasts.add({
        label: `Torrent queued ${torrent.name}`,
        kind: "success",
      });
    }
  };

  const remove = (torrent: APITorrent) => {
    const { [torrent.id]: removed, ...rest } = get(torrents);
    _updateTorrentById(torrent.id, { loading: true });
    if (isElectron()) {
      (window as WindowWithContextBridge).wt.remove(torrent.id, (err) => {
        if (!err) {
          torrents.update(() => rest);
          toasts.add({
            label: `Torrent removed ${torrent.name}`,
            kind: "danger",
          });
        } else {
          toasts.add({
            label: "Failed to remove torrent - " + err,
            kind: "danger",
          });
          _updateTorrentById(torrent.id, { loading: false });
        }
      });
    }
  };

  const exists = (id: number) => {
    const found = !!get(torrents)[id];
    return found;
  };

  const save = (id: number) => {
    (window as WindowWithContextBridge).wt.save(id, (err) => {
      if (!err) {
        _updateTorrentById(id, { saveState: "saved" });
        toasts.add({
          label: "Successfully saved torrent file",
          kind: "success",
        });
      } else {
        toasts.add({
          label: "Failed to saved torrent file - " + err,
          kind: "danger",
        });
        _updateTorrentById(id, { saveState: "notsaved" });
      }
    });
    _updateTorrentById(id, { saveState: "saving" });
  };

  const pause = (torrent: APITorrent) => {
    (window as WindowWithContextBridge).wt.pause(
      torrent.magnet,
      torrent.id,
      (err) => {
        if (err) {
          _updateTorrentById(torrent.id, { pauseState: "running" });
          toasts.add({
            label: "Failed to pause torrent - " + err,
            kind: "danger",
          });
        } else {
          _updateTorrentById(torrent.id, { pauseState: "paused" });
        }
      }
    );
    // show paused status and wait for final result from above callback
    _updateTorrentById(torrent.id, { pauseState: "pausing" });
  };

  const resume = (torrent: APITorrent) => {
    (window as WindowWithContextBridge).wt.resume(
      torrent.magnet,
      torrent.id,
      (err) => {
        if (err) {
          _updateTorrentById(torrent.id, { pauseState: "paused" });

          toasts.add({
            label: "Failed to resume torrent - " + err,
            kind: "danger",
          });
        } else {
          _updateTorrentById(torrent.id, { pauseState: "running" });
        }
        timeoutErrors.forEach(window.clearTimeout);
      }
    );
    _updateTorrentById(torrent.id, { pauseState: "resuming" });

    const clearTimeoutIfTorrentUndefined = () => {
      if (!get(torrents)[torrent.id]) {
        return timeoutErrors.forEach(window.clearTimeout);
      }
    };
    const timeoutErrors = [
      window.setTimeout(() => {
        clearTimeoutIfTorrentUndefined();
        toasts.add({
          label:
            "Failed to resume torrent - could not resume torrent within 5 seconds",
          kind: "danger",
        });
      }, 5000),
      window.setTimeout(() => {
        clearTimeoutIfTorrentUndefined();
        toasts.add({
          label:
            "Failed to resume torrent - could not resume torrent within 20 seconds",
          kind: "danger",
        });
      }, 20000),
      window.setTimeout(() => {
        clearTimeoutIfTorrentUndefined();
        toasts.add({
          label:
            "Failed to resume torrent - could not resume torrent within 30 seconds, cancelling resume...",
          kind: "danger",
        });
        pause(torrent);
      }, 30000),
    ];
  };

  (window as WindowWithContextBridge).wt.subscribeDirectSave((id, err) => {
    console.log("direct saved", id);
    const torrentName = get(torrents)[id].searchResult.name;
    if (err) {
      return toasts.add({
        label: `Failed to save torrent file (direct) [${torrentName}] - ${err}`,
        kind: "danger",
      });
    }
    _updateTorrentById(id, {
      saveState: "saved",
    });
    toasts.add({
      label: `Successfully saved torrent file (direct) [${torrentName}]`,
      kind: "success",
    });
  });

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
    pause,
    resume,
  };
};

export const torrents = useTorrents();
