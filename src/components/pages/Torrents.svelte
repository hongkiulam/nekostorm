<script lang="ts">
  import { onDestroy } from "svelte";
  import Masonry from "../atoms/Masonry.svelte";
  import TorrentCard from "../molecules/TorrentCard.svelte";
  import MainLayout from "../templates/MainLayout.svelte";
  import type { TorrentInstance } from "../../types/torrent";
  import { torrents } from "../../store/torrents";
  import { badgeCount } from "../../store/badgeCount";
  import { isElectron } from "../../helpers/isElectron";

  let recalculate = () => {};

  const refreshLayout = window.setInterval(() => {
    recalculate();
  }, 1000);
  onDestroy(() => {
    clearInterval(refreshLayout);
  });

  badgeCount.reset("torrents");

  $: _torrents = Object.values($torrents).sort(
    (a, b) => a.added - b.added
  ) as TorrentInstance[];
</script>

<MainLayout>
  <h2 slot="header">Torrents</h2>
  {#if isElectron()}
    {#if _torrents.length > 0}
      <Masonry
        bind:recalculate
        columns={3}
        breakAt={{
          940: 2,
          600: 1,
        }}
      >
        {#each _torrents as torrent (torrent?.searchResult?.id)}
          {#if torrent?.searchResult?.id}
            <div><TorrentCard {torrent} /></div>
          {/if}
        {/each}
      </Masonry>
    {:else}
      <p>Here you will find the anime that you are currently downloading!</p>
    {/if}
  {:else}
    <p>Please install our desktop app to download torrents with NekoStorm</p>
  {/if}
</MainLayout>
