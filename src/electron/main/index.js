const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const client = require("./client");
const webtorrent = require("./webtorrent");
const rimraf = require("rimraf");
const os = require("os");
const fs = require("fs");
const fse = require("fs-extra");

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

app.on("will-quit", (e) => {
  rimraf.sync(path.join(os.tmpdir(), "nekostorm"));
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
const clientToWebTorrentEvents = [
  "wt-add",
  "wt-remove",
  "wt-presave",
  "wt-pause",
  "wt-resume",
];
const webTorrentToClientEvents = ["wt-metadata", "wt-progress"];

clientToWebTorrentEvents.forEach((e) => {
  ipcMain.on("client>webtorrent:" + e, (event, ...args) => {
    webtorrent.send("client>webtorrent:" + e, ...args);
  });
});

webTorrentToClientEvents.forEach((e) => {
  ipcMain.on("webtorrent>client:" + e, (event, ...args) => {
    client.send("webtorrent>client:" + e, ...args);
  });
});

/**
 * Additional Events
 */
ipcMain.on("webtorrent>main:remove-file", (event, path) => {
  rimraf(path, (err) => {
    if (err) {
      event.reply("rimraf-error", err);
    }
    event.reply("rimraf-done", "done");
  });
});

ipcMain.on("webtorrent>main:wt-save", (event, tmpPath, name, torrentKey) => {
  const saveFlow = (defaultPath) => {
    const newPath = dialog.showSaveDialogSync({
      title: "Save Torrent",
      defaultPath,
    });

    if (newPath) {
      if (fs.existsSync(newPath)) {
        const fileExistsResponse = dialog.showMessageBoxSync({
          message:
            "File already exists, do you want to replace the existing file?",
          buttons: ["No", "Yes"],
        });
        if (fileExistsResponse === 0) {
          return saveFlow(newPath);
        } else {
          // they want to replace
          rimraf.sync(newPath);
        }
      }
      // move torrent from tmp to their desired location
      fse.move(path.join(tmpPath, name), newPath).then((err) => {
        if (err) {
          console.error(err);
          dialog.showMessageBoxSync({ message: "Failed to save file" });
          client.send("main>client:wt-save", torrentKey, false);
        }
        client.send("main>client:wt-save", torrentKey, true);
      });
    }
  };
  saveFlow(name);
});
