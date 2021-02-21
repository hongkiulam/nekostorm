import type { APITorrent } from "../types/api";
import qs from "query-string";
import { isElectron } from "./isElectron";
import { toasts } from "../store/toasts";
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
  const queryObj = qs.parse(queryString);
  return new Promise((res, rej) => {
    const api = (window as any).api;
    api.receive("main>client:neko", (data: APITorrent[]) => {
      if (data) {
        res(data);
      } else {
        rej();
        failedToFetch();
      }
    });
    api.send("client>main:neko", queryObj);
  });
};
export const nekoFetch = isElectron() ? nekoFetchElectron : nekoFetchNetlify;
