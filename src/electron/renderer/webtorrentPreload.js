console.log("webtorrent preload loaded");
// coptied from https://stackoverflow.com/a/59796326
const os = require("os");
const path = require("path");
const { ipcRenderer } = require("electron");
const WT = require("webtorrent");

const wtClient = new WT();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

const findTorrentFromId = (torrentKey) =>
  wtClient.torrents.find((torrent) => torrent.key === torrentKey);

/**
 * Add
 */
ipcRenderer.on("client>webtorrent:wt-add", (event, magnet, torrentKey) => {
  console.log("[wt-add]", magnet, torrentKey);
  const torrent = wtClient.add(
    magnet,
    { path: path.join(os.tmpdir(), "nekostorm", torrentKey.toString()) },
    (torrent) => {
      // just need to notify of when metadata loaded, the rest will be handled with
      // setInterval below
      ipcRenderer.send("webtorrent>client:wt-metadata", torrentKey);
    }
  );
  torrent.key = torrentKey;
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
  console.log("[wt-save] ", foundTorrent.path, foundTorrent.name);
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
    foundTorrent.name,
    torrentKey
  );
});

/**
 * Pause & Resume
 */
ipcRenderer.on("client>webtorrent:wt-pause", (event, torrentKey) => {
  const foundTorrent = findTorrentFromId(torrentKey);
  console.log("[wt-pause]", torrentKey);
  // we actually need to remove, the re add to resume
  wtClient.remove(foundTorrent.infoHash);
});
ipcRenderer.on("client>webtorrent:wt-resume", (event, magnet, torrentKey) => {
  console.log("[wt-resume]", torrentKey);
  // re-add torrent to same path to resume
  const torrent = wtClient.add(
    magnet,
    { path: path.join(os.tmpdir(), "nekostorm", torrentKey.toString()) },
    (torrent) => {}
  );
  torrent.key = torrentKey;
});

// N.B. torrentKey and id are synonymous
