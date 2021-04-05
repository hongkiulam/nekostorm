<script lang="ts">
  import { push } from "svelte-spa-router";
  import {
    ArrowDownIcon,
    ArrowUpIcon,
    ClockIcon,
    PercentIcon,
    UserIcon,
  } from "svelte-feather-icons/src";
  import { Diamonds } from "svelte-loading-spinners";
  import tippy from "sveltejs-tippy";

  import Card from "../atoms/Card.svelte";

  import { webtorrents } from "../../store/webtorrents";
  import { prettyBytes, formatTime, NaNGuard } from "../../helpers/format";
  import type { TorrentInstance } from "../../types/torrent";
  import { size } from "../../helpers/constants";
  import { removeTorrent } from "../../helpers/torrent";
  import TorrentSaveButton from "./TorrentSaveButton.svelte";
  import TorrentPauseButton from "./TorrentPauseButton.svelte";
  import TorrentStreamButton from './TorrentStreamButton.svelte';

  export let torrent: TorrentInstance;

  $: webtorrent = $webtorrents[torrent.searchResult.id] || {};

  $: downloadSpeed = webtorrent.downloadSpeed || 0;
  $: uploadSpeed = webtorrent.uploadSpeed || 0;
  $: downloaded = webtorrent.downloaded || 0;
  $: timeRemaining = NaNGuard(webtorrent.timeRemaining / 1000); // seconds
  $: length = webtorrent.length || 0;
  $: numPeers = webtorrent.numPeers || 0;
  $: percentComplete = NaNGuard(
    Number(((downloaded / length) * 100)?.toFixed(0))
  );
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
    &:not(.actions) :global(svg) {
      margin-right: var(--u);
      flex-shrink: 0;
    }
  }
  .actions {
    margin-left: auto;
  }
</style>

<Card
  on:click={() => {
    push("/torrents/" + torrent.searchResult.id);
  }}
  on:delete={() => {
    removeTorrent(torrent);
  }}
  color={webtorrent.done
    ? "success"
    : torrent.pauseState === "paused"
    ? "primary"
    : "warning"}
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
    <span
      class="info"
      use:tippy={{ content: "Download Speed", delay: [500, 0] }}
      ><ArrowDownIcon size={size.u2} />{prettyBytes(downloadSpeed)}/s</span
    >
    <span
      class="info"
      use:tippy={{ content: "Percentage Complete", delay: [500, 0] }}
      ><PercentIcon size={size.u2} />{percentComplete}%</span
    >
    <span class="info" use:tippy={{ content: "Upload Speed", delay: [500, 0] }}
      ><ArrowUpIcon size={size.u2} />{prettyBytes(uploadSpeed)}/s</span
    >
    <span
      class="info"
      use:tippy={{ content: "Time Remaining", delay: [500, 0] }}
      ><ClockIcon size={size.u2} />{formatTime(timeRemaining)}</span
    >
    <span class="info" use:tippy={{ content: "No. of Peers", delay: [500, 0] }}
      ><UserIcon size={size.u2} />{numPeers}</span
    >
    <div class="info full-span actions">
      <TorrentPauseButton mini torrentId={torrent.searchResult.id} />
      <TorrentSaveButton mini torrentId={torrent.searchResult.id} />
      <TorrentStreamButton mini torrentId={torrent.searchResult.id} />
    </div>
  {/if}
</Card>
