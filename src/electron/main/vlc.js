const { spawn } = require("child_process");
const { ipcMain, app } = require("electron");
const vlcStatic = require("vlc-static");

let vlcPath;
try {
  vlcPath = vlcStatic();
} catch {}

/**
 * @type {import("child_process").ChildProcessWithoutNullStreams}
 */
let vlcProcess;

ipcMain.on("client>main:vlc-play", (event, streamUrl) => {
  if (!vlcPath) {
    event.returnValue = { error: "Could not find VLC" };
    return;
  }
  if (vlcProcess) {
    event.returnValue = { error: "VLC already running" };
    return;
  }
  vlcProcess = spawn(vlcPath, [streamUrl], { shell: true });

  if (typeof vlcProcess.pid !== "number") {
    event.returnValue = { error: "Failed to start VLC" };
    return;
  }
  vlcProcess.on("exit", (code) => {
    console.log("VLC exited with code: ", code);
    vlcProcess.kill();
    vlcProcess = null;
  });

  event.returnValue = { error: null };
});

app.on("will-quit", () => {
  if (vlcProcess) {
    vlcProcess.kill();
  }
});
