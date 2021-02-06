import { derived, readable, writable } from "svelte/store";
import { querystring } from "svelte-spa-router";
import { parse } from "query-string";
import type { QueryObject } from "../types/query";
import type { APITorrent } from "src/types/api";

// WebTorrent
export const wtClient = (window as any).WebTorrent
  ? new (window as any).WebTorrent()
  : undefined;

export const parsedQueryString = derived(querystring, ($qs) => {
  return parse($qs || "") as QueryObject;
});
export const searchResults = writable<APITorrent[]>([]);
