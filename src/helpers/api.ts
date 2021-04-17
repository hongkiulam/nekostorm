import type { APITorrent } from "../types/api";
import qs from "query-string";
import { isElectron } from "./isElectron";
import { toasts } from "../store/toasts";
import { api } from "./ipc";
import type { QueryObject } from "../types/query";
const API_URL = "/.netlify/functions/api";

const failedToFetch = () => {
  toasts.add({
    label: "Failed to fetch torrents, consider trying a different source",
    kind: "danger",
  });
};

const nekoFetchNetlify = async (queryString: string): Promise<APITorrent[]> => {
  try {
    const response = await fetch(`${API_URL}?${queryString}`);
    if (response.status !== 500) {
      const data = await response.json();
      return data;
    } else {
      failedToFetch();
      throw new Error(response.statusText);
    }
  } catch (err) {
    failedToFetch();
    throw new Error(err);
  }
};
const nekoFetchElectron = async (
  queryString: string
): Promise<APITorrent[]> => {
  const queryObj = qs.parse(queryString) as QueryObject;
  return new Promise((res, rej) => {
    api.fetch(queryObj).then((data) => {
      if (data) {
        res(data);
      } else {
        rej();
        failedToFetch();
      }
    });
  });
};
export const nekoFetch = isElectron() ? nekoFetchElectron : nekoFetchNetlify;
