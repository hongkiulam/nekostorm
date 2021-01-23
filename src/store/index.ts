import { readable, writable } from "svelte/store";
import { querystring } from "svelte-spa-router";
import { parse } from "query-string";
import type { SearchResponse } from "../types/nyaa";
import type { QueryObject } from "../types/query";

// WebTorrent
export const wtClient = (window as any).WebTorrent
  ? new (window as any).WebTorrent()
  : undefined;

export const searchResults = writable<SearchResponse | null>(null);
export const parsedQueryString = readable<QueryObject | null>(null, (set) => {
  querystring.subscribe((qs) => {
    if (qs) {
      set(parse(qs) as QueryObject);
    }
  });
});
export const sidebar = writable({ left: false, right: false });
