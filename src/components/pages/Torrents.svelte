<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import TorrentSidebarItem from "../molecules/TorrentSidebarItem.svelte";
  import type { TorrentInstance } from "../../types/torrent";
  import { torrents } from "../../store/customStores/torrents";

  $: {
    console.log($torrents);
  }

  $: _torrents = Object.values($torrents).sort(
    (a, b) => a.added - b.added
  ) as TorrentInstance[];
</script>

<div>
  {#each _torrents as torrent (torrent.searchResult.id)}
    <div animate:flip={{ duration: 300 }} out:fade>
      <TorrentSidebarItem {torrent} />
    </div>
  {/each}
</div>
