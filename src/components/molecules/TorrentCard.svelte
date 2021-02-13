<script lang="ts">
  import { push } from "svelte-spa-router";
  import {
    ArrowDownIcon,
    ArrowUpIcon,
    PercentIcon,
    UserIcon,
  } from "svelte-feather-icons/src";
  import { Diamonds } from "svelte-loading-spinners";

  import Card from "../atoms/Card.svelte";

  import { webtorrents } from "../../store/webtorrents";
  import { torrents } from "../../store/torrents";
  import { prettyBytes } from "../../helpers/format";
  import type { TorrentInstance } from "../../types/torrent";
  import { size } from "../../helpers/constants";
  import Button from "../atoms/Button.svelte";

  export let torrent: TorrentInstance;

  $: webtorrent = $webtorrents[torrent.searchResult.id] || {};

  $: downloadSpeed = webtorrent.downloadSpeed || 0;
  $: uploadSpeed = webtorrent.uploadSpeed || 0;
  $: downloaded = webtorrent.downloaded || 0;
  $: length = webtorrent.length || 0;
  $: numPeers = webtorrent.numPeers || 0;
  $: percentComplete = ((downloaded / length) * 100).toFixed(0);

  const removeTorrent = () => {
    const remove = confirm(
      "This action will remove the downloaded files, do you want to continue?"
    );
    if (remove) {
      torrents.remove(torrent.searchResult);
    }
  };
</script>

<style lang="scss">
  .info {
    display: flex;
    align-items: center;
    line-height: var(--u2);
    vertical-align: middle;
    &.full-span {
      grid-column: 1/3;
    }
    :global(svg) {
      margin-right: var(--u);
    }
  }
</style>

<Card
  on:click={() => {
    push("/torrents/" + torrent.searchResult.id);
  }}
  on:delete={removeTorrent}
  color={webtorrent.done ? "success" : "warning"}
>
  <span class="info full-span">{torrent.searchResult.name}</span>
  {#if torrent.loading}
    <span class="info"
      ><Diamonds
        size={Number(size.u2) * 2}
        color="var(--copy-primary)"
        unit="px"
      /></span
    >
  {:else}
    <span class="info"
      ><ArrowDownIcon size={size.u2} />{prettyBytes(downloadSpeed)}/s</span
    >
    <span class="info"><PercentIcon size={size.u2} />{percentComplete}%</span>
    <span class="info"><UserIcon size={size.u2} />{numPeers}</span>
    <span class="info"
      ><ArrowUpIcon size={size.u2} />{prettyBytes(uploadSpeed)}/s</span
    >
    <div />
    <Button
      color="success"
      disabled={!webtorrent.done}
      on:click={(e) => {
        e.stopPropagation();
        // save
        alert("Doesnt do anything yet");
      }}>Save</Button
    >
  {/if}
</Card>
