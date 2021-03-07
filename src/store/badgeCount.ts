import type { BadgeCount } from "src/types/badgeCount";
import { derived, get, Readable, writable } from "svelte/store";
import { savedSearches } from "./savedSearches";
import { torrents } from "./torrents";

const useBadgeCount = () => {
  const _viewedCount = writable<BadgeCount>({
    savedSearches: get(savedSearches).length,
    torrents: Object.keys(get(torrents)).length,
  });
  const _totalCount: Readable<BadgeCount> = derived(
    [savedSearches, torrents],
    ([$savedSearches, $torrents]) => {
      return {
        savedSearches: $savedSearches.length,
        torrents: Object.keys($torrents).length,
      };
    }
  );
  const _unviewedCount: Readable<BadgeCount> = derived(
    [_viewedCount, _totalCount],
    ([$viewed, $total]) => {
      return {
        savedSearches: $total.savedSearches - $viewed.savedSearches,
        torrents: $total.torrents - $viewed.torrents,
      };
    }
  );

  const reset = (key: keyof BadgeCount) => {
    const val: { [key in keyof BadgeCount]: number } = {
      savedSearches: get(savedSearches).length,
      torrents: Object.keys(get(torrents)).length,
    };
    _viewedCount.update((old) => ({
      ...old,
      [key]: val[key],
    }));
  };

  _unviewedCount.subscribe((unviewed) => {
    // if we have viewed more than the total available i.e. unviewed < 0
    // reset viewed count to new total
    Object.entries(unviewed).forEach(([key, value]) => {
      if (value < 0) {
        reset(key as keyof BadgeCount);
      }
    });
  });
  return {
    subscribe: _unviewedCount.subscribe,
    reset,
  };
};

export const badgeCount = useBadgeCount();
