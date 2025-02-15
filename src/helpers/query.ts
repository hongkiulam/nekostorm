import { push } from "svelte-spa-router";
import { get } from "svelte/store";
import { parsedQueryString } from "../store/basic";

export const objToQueryString = (
  queryParams: { [key: string]: string } | null
) => {
  const queryString = Object.entries(queryParams || {})
    .map(([key, val]) => key + "=" + val)
    .join("&");
  return queryString;
};
export const updateQuery = (newQuery: { [key: string]: string }) => {
  const pQS = get(parsedQueryString);
  push("/?" + objToQueryString({ ...pQS, ...newQuery }));
};
