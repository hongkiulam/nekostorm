import { derived, readable, writable } from "svelte/store";
import { querystring } from "svelte-spa-router";
import { parse } from "query-string";
import type { QueryObject } from "../types/query";
import type { APITorrent } from "src/types/api";

export const parsedQueryString = derived(querystring, ($qs) => {
  return parse($qs || "") as QueryObject;
});

export const prevParsedQueryString = readable<QueryObject | null>(
  null,
  (set) => {
    parsedQueryString.subscribe((pQs) => {
      // we should only have an empty query {} if we navigate away
      // don't update if we navigate away
      if (Object.keys(pQs).length === 0) return;
      set(pQs);
    });
  }
);
export const searchResults = writable<APITorrent[]>([]);
