console.log("webtorrent preload loaded");
// coptied from https://stackoverflow.com/a/59796326
const { contextBridge, ipcRenderer } = require("electron");
const WT = require("webtorrent");

const wtClient = new WT();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

ipcRenderer.on("main>webtorrent:wt-add", (event, magnet) => {
  console.log("received event", magnet);
  // ipcRenderer.send("webtorrent>main:wt-add", "reply");
});
