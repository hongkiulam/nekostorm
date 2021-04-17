import { wt } from "./ipc";
import type { Filters, QueryObject } from "../types/query";
import wtLocalStorage from "./wtLocalStorage";

const filter = {
  _key: "nekostorm-default-filter",
  set: function (filters: Partial<Filters>) {
    localStorage.setItem(this._key, JSON.stringify(filters));
  },
  get: function (): Partial<Filters> {
    return JSON.parse(localStorage.getItem(this._key) || "{}");
  },
  matches: function (currentFilter: Partial<Filters>) {
    const baseFilters = {
      source: "animetosho",
      sort: "date",
      order: "false",
      show: "all",
      user: "",
    };
    const c = { ...baseFilters, ...currentFilter }; //current
    const d = this.get(); //default
    if (
      c.source === d.source &&
      c.sort === d.sort &&
      c.order === d.order &&
      c.show === d.show &&
      c.user === d.user
    ) {
      return true;
    }
    return false;
  },
};

const darkMode = {
  _key: "nekostorm-darkmode",
  _htmlEl: document.documentElement,
  get: function () {
    return !!(this._htmlEl.dataset.theme === "dark");
  },
  set: function (theme: "dark" | "light") {
    this._htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem(this._key, theme);
  },
};

const savePath = {
  _key: "nekostorm-savepath",
  set: function (reset: boolean = false) {
    if (reset) {
      wtLocalStorage.set(this._key, "");
      return "";
    }
    const savePath = wt.requestSavePath();
    if (savePath) {
      wtLocalStorage.set(this._key, savePath);
    }
    return savePath;
  },
  get: function () {
    return wtLocalStorage.get(this._key);
  },
};

const directSave = {
  _key: "nekostorm-directsave",
  set: function (value: string) {
    return wtLocalStorage.set(this._key, value);
  },
  get: function () {
    return wtLocalStorage.get(this._key);
  },
};

export default {
  filter,
  darkMode,
  savePath,
  directSave,
};
