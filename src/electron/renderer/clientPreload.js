// coptied from https://stackoverflow.com/a/59796326
const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  fetch: (data) => {
    return new Promise((res, rej) => {
      ipcRenderer.send("client>main:neko", data);
      ipcRenderer.once("main>client:neko", (event, response) => {
        res(response);
      });
    });
  },
});

// For interacting with localStorage on webtorrent renderer
contextBridge.exposeInMainWorld("wt-localStorage", {
  /**
   * @type {Storage['setItem']}
   */
  setItem: (...args) => {
    ipcRenderer.send("client>webtorrent:wt-localStorage-setItem", ...args);
  },
  /**
   * @type {{key: string; received: function}}
   */
  getItem: (key, cb) => {
    ipcRenderer.send("client>webtorrent:wt-localStorage-getItem", key);
    const receive = (event, _key, value) => {
      if (key === _key) {
        cb(value);
        ipcRenderer.removeListener(
          "webtorrent>client:wt-localStorage-getItem",
          receive
        );
      }
    };
    ipcRenderer.on("webtorrent>client:wt-localStorage-getItem", receive);
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
    progressListener = listener;
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
  requestSavePath: () => {
    return ipcRenderer.sendSync("client>main:wt-request-save-path");
  },
  subscribeDirectSave: (listener) => {
    directSaveListener = listener;
  },
});

let progressListener = () => {};
ipcRenderer.on("webtorrent>client:wt-progress", (event, torrentIdMap) => {
  progressListener(torrentIdMap);
});

/**
 * Listen for direct save events
 */
let directSaveListener = () => {};
ipcRenderer.on("main>client:wt-direct-save", (event, torrentKey, err) => {
  console.log("[wt-direct-save]", torrentKey);
  directSaveListener(torrentKey, err);
});
