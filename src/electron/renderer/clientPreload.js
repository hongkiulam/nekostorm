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
    ipcRenderer.send("client>webtorrent:wt-add", magnet, id);
  },
  metadata: (id, cb) => {
    const metaDataListener = (event, torrentKey) => {
      if (id === torrentKey) {
        console.log("[webtorrent] received metadata");
        ipcRenderer.removeListener(
          "webtorrent>client:wt-metadata",
          metaDataListener
        );
        return cb();
      }
    };
    ipcRenderer.on("webtorrent>client:wt-metadata", metaDataListener);
  },
  remove: (id) => {
    console.log("[webtorrent] remove torrent");
    ipcRenderer.send("client>webtorrent:wt-remove", id);
  },
  progress: (listener) => {
    progressListeners.push(listener);
    return progressListeners.filter((l) => l !== listener);
  },
  save: (id, cb) => {
    ipcRenderer.send("client>webtorrent:wt-presave", id);
    const finishedSaveListener = (event, torrentKey, success) => {
      if (torrentKey === id) {
        if (success) {
          console.log("[wt-save] Successfully saved torrent");
          cb();
        }
        ipcRenderer.removeListener("main>client:wt-save", finishedSaveListener);
      }
    };
    ipcRenderer.on("main>client:wt-save", finishedSaveListener);
  },
  pause: (id) => {
    ipcRenderer.send("client>webtorrent:wt-pause", id);
  },
  resume: (magnet, id) => {
    ipcRenderer.send("client>webtorrent:wt-resume", magnet, id);
  },
});

const progressListeners = [];

ipcRenderer.on("webtorrent>client:wt-progress", (event, torrentIdMap) => {
  progressListeners.forEach((listener) => {
    listener(torrentIdMap);
  });
});
