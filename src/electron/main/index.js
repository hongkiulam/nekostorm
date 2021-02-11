const { app, BrowserWindow } = require("electron");
const path = require("path");
const client = require("./client");
const webtorrent = require("./webtorrent");

// TODO: Create typescript file instead.

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  client.init();
  webtorrent.init();
  // const mainWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     contextIsolation: true,
  //     preload: path.join(__dirname, "preload.js"), // use a preload script
  //   },
  // });

  // const args = process.argv.slice(2);
  // if (args.includes("dev") || process.env.DEV) {
  //   // and load the snowpack dev url
  //   mainWindow.loadURL("http://localhost:8080");
  // } else {
  //   // and load the index.html of the app.
  //   mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  // }

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const { ipcMain } = require("electron");
const api = require("../../../server/_api");

ipcMain.on("client>main:neko", (event, args) => {
  api(args)
    .then((data) => {
      client.send("main>client:neko", data);
    })
    .catch(() => {
      client.send("main>client:neko");
    });
});

/**
 * Events to pass from client to wt and vice versa
 */
const clientToWebTorrentEvents = ["wt-add"];
const webTorrentToClientEvents = [];

clientToWebTorrentEvents.forEach((e) => {
  ipcMain.on("client>main:" + e, (event, ...args) => {
    webtorrent.send("main>webtorrent:" + e, ...args);
  });
});

webTorrentToClientEvents.forEach((e) => {
  ipcMain.on("webtorrent>main:" + e, (event, ...args) => {
    client.send("main>client:" + e, ...args);
  });
});
