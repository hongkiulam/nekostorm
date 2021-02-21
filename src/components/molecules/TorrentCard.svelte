<script lang="ts">
  import { push } from "svelte-spa-router";
  import {
    ArrowDownIcon,
    ArrowUpIcon,
    ClockIcon,
    PauseIcon,
    PercentIcon,
    PlayIcon,
    SaveIcon,
    UserIcon,
  } from "svelte-feather-icons/src";
  import { Diamonds } from "svelte-loading-spinners";
  import tippy from "sveltejs-tippy";

  import Card from "../atoms/Card.svelte";

  import { webtorrents } from "../../store/webtorrents";
  import { torrents } from "../../store/torrents";
  import { prettyBytes, formatTime } from "../../helpers/format";
  import type { TorrentInstance } from "../../types/torrent";
  import { size } from "../../helpers/constants";
  import Button from "../atoms/Button.svelte";

  export let torrent: TorrentInstance;

  const NaNGuard = (num: number) => {
    // useful when value is derived from division as x/0 or x/undefined is NaN
    return isNaN(num) ? 0 : num;
  };

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
  on:delete={removeTorrent}
  color={webtorrent.done ? "success" : torrent.paused ? "primary" : "warning"}
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
      <Button
        color={webtorrent.done ? "copy" : "warning"}
        disabled={webtorrent.done}
        inverted
        on:click={(e) => {
          e.stopPropagation();
          if (torrent.paused) {
            torrents.resume(torrent.searchResult);
          } else {
            torrents.pause(torrent.searchResult.id);
          }
        }}
        tippyProps={{ content: "Pause/ Resume" }}
        >{#if torrent.paused}
          <PlayIcon size={size.u2} />
        {:else}
          <PauseIcon size={size.u2} />
        {/if}
      </Button>
      <Button
        color={!webtorrent.done ? "copy" : "success"}
        disabled={!webtorrent.done || torrent.saved}
        inverted
        on:click={(e) => {
          e.stopPropagation();
          // save
          torrents.save(torrent.searchResult.id);
        }}
        tippyProps={{ content: "Save" }}
      >
        <SaveIcon size={size.u2} />
      </Button>
    </div>
  {/if}
</Card>
