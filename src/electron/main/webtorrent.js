const { app, BrowserWindow } = require("electron");
const path = require("path");

let win = null;
const args = process.argv.slice(2);
const isDev = args.includes("dev") || process.env.DEV;
const init = () => {
  // Create the browser window.
  win = new BrowserWindow({
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 150,
    width: 150,
    maximizable: false,
    minimizable: false,
    resizable: true,
    show: isDev,
    skipTaskbar: true,
    title: "webtorrent-hidden-window",
    useContentSize: true,
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../renderer/webtorrentPreload.js"), // use a preload script
    },
  });

  if (isDev) {
    // and load the snowpack dev url
    win.loadFile(path.join(__dirname, "../../../public/webtorrent.html"));
  } else {
    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, "../../../build/webtorrent.html"));
  }
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools();
  }
};

function send(...args) {
  if (!win) return;
  win.webContents.send(...args);
}

module.exports = {
  init,
  win,
  send,
};
