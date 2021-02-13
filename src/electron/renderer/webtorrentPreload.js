console.log("webtorrent preload loaded");
// coptied from https://stackoverflow.com/a/59796326
const { ipcRenderer } = require("electron");
const WT = require("webtorrent");

const wtClient = new WT();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

ipcRenderer.on("main>webtorrent:wt-add", (event, magnet, id) => {
  console.log("[wt-add]", magnet, id);
  wtClient.add(magnet, (torrent) => {
    torrent.key = id;
    ipcRenderer.send("webtorrent>main:wt-metadata", id);
  });
});

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

ipcRenderer.on("main>webtorrent:wt-remove", (event, torrentKey) => {
  const foundTorrent = wtClient.torrents.find(
    (torrent) => torrent.key === torrentKey
  );
  console.log("[wt-remove]", torrentKey, foundTorrent);

  wtClient.remove(foundTorrent.infoHash);
  ipcRenderer.send("webtorrent>main:remove-file", foundTorrent.path);
});
