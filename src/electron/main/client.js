const { app, BrowserWindow } = require("electron");
const path = require("path");

let win = null;
const init = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "../renderer/clientPreload.js"), // use a preload script
    },
  });

  const args = process.argv.slice(2);
  if (args.includes("dev") || process.env.DEV) {
    // and load the snowpack dev url
    win.loadURL("http://localhost:8080");
  } else {
    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, "../../build/index.html"));
  }

  // Open the DevTools.
  win.webContents.openDevTools();
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
