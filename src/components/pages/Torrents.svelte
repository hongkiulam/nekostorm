<script lang="ts">
  import Masonry from "svelte-masonry/Masonry.svelte";
  import TorrentCard from "../molecules/TorrentCard.svelte";
  import MainLayout from "../templates/MainLayout.svelte";
  import type { TorrentInstance } from "../../types/torrent";
  import { torrents } from "../../store/torrents";
  import { size } from "../../helpers/constants";
  import { isElectron } from "../../helpers/isElectron";

  let refreshLayout: () => Promise<void>;

  $: {
    refreshLayout?.();
    $torrents; // refresh layout when torrents changes
  }
  $: {
    console.log($torrents);
  }

  $: _torrents = Object.values($torrents).sort(
    (a, b) => a.added - b.added
  ) as TorrentInstance[];
</script>

<MainLayout>
  <h2 slot="header">Torrents</h2>
  {#if isElectron()}
    {#if _torrents.length > 0}
      <Masonry bind:refreshLayout gridGap={size.u + "px"}>
        {#each _torrents as torrent (torrent?.searchResult?.id)}
          {#if torrent?.searchResult?.id}
            <TorrentCard {torrent} />
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
