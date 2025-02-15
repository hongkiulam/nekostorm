import { get, writable } from "svelte/store";
import { objToQueryString } from "../helpers/query";
import type { SavedSearch } from "../types/savedSearch";
import { toasts } from "./toasts";

const savedSearchStorageKey = "nekostorm-savedSearches";
const useSavedSearch = () => {
  const initialValue = localStorage.getItem(savedSearchStorageKey);
  const savedSearches = writable<SavedSearch[]>(
    initialValue ? JSON.parse(initialValue) : []
  );
  const add = (search: SavedSearch) => {
    savedSearches.update((oldSS) => [...oldSS, search]);
    toasts.add({
      label: "Saved Search: " + search.q,
      kind: "success",
    });
  };
  const remove = (search: SavedSearch) => {
    const removed = get(savedSearches).filter((sS) => {
      const stringToRemove = objToQueryString(search);
      const stringInStore = objToQueryString(sS);
      return stringToRemove !== stringInStore;
    });
    savedSearches.set(removed);
    toasts.add({
      label: "Removed Saved Search: " + search.q,
      kind: "danger",
    });
  };
  const exists = (search: SavedSearch | null) => {
    const found = get(savedSearches).some((sS) => {
      const stringToFind = objToQueryString(search);
      const stringInStore = objToQueryString(sS);
      return stringToFind === stringInStore;
    });
    return found;
  };

  // sync up store with localStorage
  savedSearches.subscribe((sS) => {
    localStorage.setItem(savedSearchStorageKey, JSON.stringify(sS));
    console.log("SavedSearchesUpdated", sS);
  });

  return {
    ...savedSearches,
    add,
    remove,
    exists,
  };
};

export const savedSearches = useSavedSearch();
