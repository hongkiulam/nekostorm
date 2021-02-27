import type { Filters, QueryObject } from "../types/query";

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

export default {
  filter,
};
