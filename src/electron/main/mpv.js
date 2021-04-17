const { app, dialog, ipcMain } = require('electron');
const path = require('path');

/**
 * Start of MPV setup
 * Don't forget to set webPreferences.plugins = true
 */

const {getPluginEntry} = require("mpv.js-vanilla");

let os;
switch (process.platform) {
  case 'darwin':
    os='mac'
    break;
  case 'win32':
    os = 'win'
    break;
}

const pdir = path.join(__dirname, "../../../mpv", os);
if (process.platform !== "linux") {process.chdir(pdir);}
// Fix for latest Electron.
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("register-pepper-plugins", getPluginEntry(pdir));

/**
 * End of MPV Setup
 */