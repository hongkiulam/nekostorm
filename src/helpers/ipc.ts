// reexport ipcRenderer methods for convenience

import type { WindowWithContextBridge } from "../types/window";
const _window = window as WindowWithContextBridge;

export const api = _window.api;
export const wt = _window.wt;
export const wtLocalStorage = _window['wt-localStorage']
