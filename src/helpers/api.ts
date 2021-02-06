import type { APITorrent } from "../types/api";

const API_URL = "/.netlify/functions/api";

export const nekoFetch = async (queryString: string): Promise<APITorrent[]> => {
  const response = await fetch(`${API_URL}?${queryString}`);
  if (response.status !== 500) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.statusText);
  }
};
