// coptied from https://stackoverflow.com/a/59796326
const { contextBridge, ipcRenderer } = require("electron");
const WT = require("webtorrent");

const wtClient = new WT();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["toNekoApi", "toWebTorrent:add"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromNekoApi", "fromWebTorrent:add"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

contextBridge.exposeInMainWorld("wt", {
  add: (magnet, callbacks) => {
    wtClient.add(magnet, (webtorrent) => {
      if (callbacks.download) {
        setInterval(() => {
          callbacks.download(webtorrent);
        }, 500);
        // webtorrent.on("download", () => {
        // });
      }
      if (callbacks.done) {
        webtorrent.on("done", () => {
          callbacks.done();
        });
      }
      if (callbacks.metadata) {
        webtorrent.on("metadata", () => {
          callbacks.metadata(webtorrent);
        });
      }
    });
  },
  remove: () => {},
  onMetaData: () => {},
});
