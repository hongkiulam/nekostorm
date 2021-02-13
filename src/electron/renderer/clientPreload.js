// coptied from https://stackoverflow.com/a/59796326
const { contextBridge, ipcRenderer } = require("electron");
const WT = require("webtorrent");

const wtClient = new WT();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["client>main:neko"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["main>client:neko"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

contextBridge.exposeInMainWorld("wt", {
  add: (magnet, id) => {
    console.log("[webtorrent] add torrent", magnet);
    ipcRenderer.send("client>main:wt-add", magnet, id);
  },
  metadata: (id, cb) => {
    const metaDataListener = (event, torrentKey) => {
      if (id === torrentKey) {
        console.log("[webtorrent] received metadata");
        ipcRenderer.removeListener("main>client:wt-metadata", metaDataListener);
        return cb();
      }
    };
    ipcRenderer.on("main>client:wt-metadata", metaDataListener);
  },
  remove: (id) => {
    console.log("[webtorrent] remove torrent");
    ipcRenderer.send("client>main:wt-remove", id);
  },
  progress: (listener) => {
    progressListeners.push(listener);
    return progressListeners.filter((l) => l !== listener);
  },
});

const progressListeners = [];

ipcRenderer.on("main>client:wt-progress", (event, torrentIdMap) => {
  progressListeners.forEach((listener) => {
    listener(torrentIdMap);
  });
});
