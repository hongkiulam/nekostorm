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
  add: (magnet) => {
    console.log(magnet);
    ipcRenderer.send("client>main:wt-add", magnet);
  },
  remove: () => {},
  onMetaData: () => {},
});
