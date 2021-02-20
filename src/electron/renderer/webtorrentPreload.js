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
ipcRenderer.on("main>webtorrent:wt-add", (event, magnet, id) => {
  console.log("[wt-add]", magnet, id);
  const torrent = wtClient.add(
    magnet,
    { path: path.join(os.tmpdir(), "nekostorm", id.toString()) },
    (torrent) => {
      // just need to notify of when metadata loaded, the rest will be handled with
      // setInterval below
      ipcRenderer.send("webtorrent>main:wt-metadata", id);
    }
  );
  torrent.key = id;
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
      };
    }
  });
  ipcRenderer.send("webtorrent>main:wt-progress", torrentIdMap);
}, 1000);

/**
 * Remove
 */
ipcRenderer.on("main>webtorrent:wt-remove", (event, torrentKey) => {
  const foundTorrent = findTorrentFromId(torrentKey);
  console.log("[wt-remove]", torrentKey, foundTorrent);

  wtClient.remove(foundTorrent.infoHash);
  ipcRenderer.send("webtorrent>main:remove-file", foundTorrent.path);
});

/**
 * Save
 */
ipcRenderer.on("main>webtorrent:wt-presave", (event, torrentKey) => {
  const foundTorrent = findTorrentFromId(torrentKey);
  console.log("[wt-save] ", foundTorrent.path, foundTorrent.name);
  ipcRenderer.send(
    "webtorrent>main:wt-save",
    foundTorrent.path,
    foundTorrent.name,
    torrentKey
  );
});
