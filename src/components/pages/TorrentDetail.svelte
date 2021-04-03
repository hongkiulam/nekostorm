<script lang="ts">
  import { push } from "svelte-spa-router";
  import MainLayout from "../templates/MainLayout.svelte";
  import TorrentDetailOverview from "../molecules/TorrentDetailOverview.svelte";
  import TorrentDetailGraphs from "../molecules/TorrentDetailGraphs.svelte";
  import { torrents } from "../../store/torrents";
  import TorrentDetailButtons from "../molecules/TorrentDetailButtons.svelte";

  export let params: { id: string };
  const torrentId = Number(params.id);
  $: torrent = $torrents[torrentId];
  $: if (!torrent) {
    push("/torrents");
  }
</script>

<style lang="scss">
  h2[slot="header"] {
    display: flex;
    align-items: center;
  }
  article {
    & > :global(* + *) {
      margin-top: var(--u2);
    }
  }
</style>

<!-- TorrentGraphs -->
{#if torrent}
  <MainLayout>
    <h2 class="title" slot="header">
      {torrent.searchResult.name}
    </h2>

    <article>
      <TorrentDetailButtons {torrentId} />
      <TorrentDetailOverview {torrentId} />
      <TorrentDetailGraphs {torrentId} />
    </article>
  </MainLayout>
{/if}
