console.log("webtorrent preload loaded");
// copied from https://stackoverflow.com/a/59796326
const path = require("path");
const { ipcRenderer } = require("electron");
const WT = require("webtorrent");
const { TMP_PATH } = require("../constants");

const wtClient = new WT();

wtClient.on("error", (err) => {
  // Probably hook this up to show a toast client side
  console.log(err);
});
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

const findTorrentFromId = (torrentKey) =>
  wtClient.torrents.find((torrent) => torrent.key === torrentKey);

const directSave = (torrent) => {
  const defaultSavePath = localStorage.getItem("nekostorm-savepath");
  const directSave = JSON.parse(localStorage.getItem("nekostorm-directsave"));
  if (directSave) {
    console.log("[wt-direct-save]", torrent.key);
    ipcRenderer.send(
      "webtorrent>main:wt-direct-save",
      torrent.path,
      defaultSavePath,
      torrent.key
    );
  }
};
/**
 * Add
 */
ipcRenderer.on("client>webtorrent:wt-add", (event, magnet, torrentKey) => {
  console.log("[wt-add]", magnet, torrentKey);
  const torrent = wtClient.add(
    magnet,
    { path: path.join(TMP_PATH, torrentKey.toString()) },
    (torrent) => {
      // just need to notify of when metadata loaded, the rest will be handled with
      // setInterval below
      ipcRenderer.send("webtorrent>client:wt-metadata", torrentKey);
    }
  );
  torrent.key = torrentKey;
  torrent.on("done", () => {
    directSave(torrent);
  });
});

/**
 * Tick
 */
// tracks torrents and emits event to client with each torrents info
setInterval(() => {
  let torrentIdMap = {};
  wtClient.torrents.forEach((torrent) => {
    if (torrent.key) {
      const {
        downloadSpeed,
        uploadSpeed,
        downloaded,
        numPeers,
        files: _files,
        length,
        done,
        timeRemaining,
      } = torrent;

      const files = _files.map((f) => {
        return { done: f.done, length: f.length, name: f.name };
      });
      torrentIdMap[torrent.key] = {
        downloadSpeed,
        uploadSpeed,
        downloaded,
        numPeers,
        files,
        length,
        done,
        timeRemaining,
      };
    }
  });
  ipcRenderer.send("webtorrent>client:wt-progress", torrentIdMap);
}, 1000);

/**
 * Remove
 */
ipcRenderer.on("client>webtorrent:wt-remove", (event, torrentKey) => {
  const foundTorrent = findTorrentFromId(torrentKey);
  console.log("[wt-remove]", torrentKey, foundTorrent);
  if (!foundTorrent) {
    return ipcRenderer.send(
      "webtorrent>client:wt-remove",
      torrentKey,
      "Could not find torrent to remove"
    );
  }
  wtClient.remove(foundTorrent.infoHash);
  ipcRenderer.send(
    "webtorrent>main:remove-file",
    foundTorrent.path,
    torrentKey
  );
});

/**
 * Save
 */
ipcRenderer.on("client>webtorrent:wt-save", (event, torrentKey) => {
  const foundTorrent = findTorrentFromId(torrentKey);
  const defaultSavePath = localStorage.getItem("nekostorm-savepath") || "";
  if (!foundTorrent) {
    return ipcRenderer.send(
      "webtorrent>client:wt-save",
      torrentKey,
      "Could not find torrent to save"
    );
  }
  ipcRenderer.send(
    "webtorrent>main:wt-save",
    foundTorrent.path,
    torrentKey,
    defaultSavePath
  );
});

/**
 * Pause & Resume
 */
ipcRenderer.on("client>webtorrent:wt-pause", (event, magnet, torrentKey) => {
  console.log("[wt-pause]", torrentKey);
  // we actually need to remove, the re add to resume
  wtClient.remove(magnet, (err) => {
    ipcRenderer.send("webtorrent>client:wt-pause", torrentKey, err);
  });
});

ipcRenderer.on("client>webtorrent:wt-resume", (event, magnet, torrentKey) => {
  console.log("[wt-resume]", torrentKey, magnet);
  // re-add torrent to same path to resume
  const torrent = wtClient.add(
    magnet,
    { path: path.join(TMP_PATH, torrentKey.toString()) },
    (torrent) => {
      ipcRenderer.send("webtorrent>client:wt-resume", torrentKey);
    }
  );
  torrent.key = torrentKey;

  torrent.on("noPeers", () => {
    console.log("[wt-resume] noPeers");
  });
  torrent.on("metadata", () => {
    console.log("[wt-resume] metadata");
  });
  torrent.on("ready", () => {
    console.log("[wt-resume] ready");
  });
  torrent.on("warning", (err) => {
    console.log("[wt-resume] warning", err);
  });
  torrent.on("error", (err) => {
    console.log("[wt-resume] error", err);
  });
  torrent.on("done", () => {
    console.log("[wt-resume] done");
    directSave(torrent);
  });
});

// N.B. torrentKey and id are synonymous

/**
 * Local Storage
 */
ipcRenderer.on("client>webtorrent:wt-localStorage-getItem", (event, key) => {
  ipcRenderer.send(
    "webtorrent>client:wt-localStorage-getItem",
    key,
    localStorage.getItem(key)
  );
});
ipcRenderer.on(
  "client>webtorrent:wt-localStorage-setItem",
  (event, ...args) => {
    localStorage.setItem(...args);
  }
);
