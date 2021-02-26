// coptied from https://stackoverflow.com/a/59796326
const { contextBridge, ipcRenderer } = require("electron");

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
  remove: (id, response) => {
    console.log("[webtorrent] remove torrent");
    ipcRenderer.send("client>webtorrent:wt-remove", id);

    const responseListener = (event, torrentKey, err) => {
      if (torrentKey === id) {
        response(err);
        ipcRenderer.removeListener(
          "webtorrent>client:wt-remove",
          responseListener
        );
        ipcRenderer.removeListener("main>client:wt-remove", responseListener);
      }
    };
    ipcRenderer.on("webtorrent>client:wt-remove", responseListener);
    ipcRenderer.on("main>client:wt-remove", responseListener);
  },
  progress: (listener) => {
    progressListeners.push(listener);
    return progressListeners.filter((l) => l !== listener);
  },
  save: (id, response) => {
    ipcRenderer.send("client>webtorrent:wt-save", id);
    const responseListener = (event, torrentKey, err) => {
      if (torrentKey === id) {
        response(err);
        ipcRenderer.removeListener("main>client:wt-save", responseListener);
        ipcRenderer.removeListener(
          "webtorrent>client:wt-save",
          responseListener
        );
      }
    };
    ipcRenderer.on("main>client:wt-save", responseListener);
    ipcRenderer.on("webtorrent>client:wt-save", responseListener);
  },
  pause: (magnet, id, response) => {
    ipcRenderer.send("client>webtorrent:wt-pause", magnet, id);
    const responseListener = (event, torrentKey, err) => {
      if (torrentKey === id) {
        response(err);
        ipcRenderer.removeListener(
          "webtorrent>client:wt-pause",
          responseListener
        );
      }
    };
    ipcRenderer.on("webtorrent>client:wt-pause", responseListener);
  },
  resume: (magnet, id, response) => {
    ipcRenderer.send("client>webtorrent:wt-resume", magnet, id);
    const responseListener = (event, torrentKey, err) => {
      if (torrentKey === id) {
        response(err);
        ipcRenderer.removeListener(
          "webtorrent>client:wt-resume",
          responseListener
        );
      }
    };
    ipcRenderer.on("webtorrent>client:wt-resume", responseListener);
  },
});

const progressListeners = [];

ipcRenderer.on("webtorrent>client:wt-progress", (event, torrentIdMap) => {
  progressListeners.forEach((listener) => {
    listener(torrentIdMap);
  });
});
