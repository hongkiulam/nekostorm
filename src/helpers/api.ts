import type { APITorrent } from "../types/api";

const API_URL = "/.netlify/functions/api";

export const nekoFetch = async (queryString: string): Promise<APITorrent[]> => {
  const response = await fetch(`${API_URL}?${queryString}`);
  const data = await response.json();
  return data;
};
