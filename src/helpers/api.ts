import type { APITorrent } from "../types/api";
import qs from "query-string";
import { isElectron } from "./isElectron";
const API_URL = "/.netlify/functions/api";

const nekoFetchNetlify = async (queryString: string): Promise<APITorrent[]> => {
  const response = await fetch(`${API_URL}?${queryString}`);
  if (response.status !== 500) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.statusText);
  }
};
const nekoFetchElectron = async (
  queryString: string
): Promise<APITorrent[]> => {
  const queryObj = qs.parse(queryString);
  return new Promise((res, rej) => {
    const api = (window as any).api;
    api.receive("fromNekoApi", (data: APITorrent[]) => {
      if (data) {
        res(data);
      } else {
        rej();
      }
    });
    api.send("toNekoApi", queryObj);
  });
};
export const nekoFetch = isElectron() ? nekoFetchElectron : nekoFetchNetlify;
