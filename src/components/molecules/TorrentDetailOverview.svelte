<script lang="ts">
  import { CheckIcon } from "svelte-feather-icons/src";
  import { Diamonds } from "svelte-loading-spinners";
  import {
    formatDate,
    formatFileSize,
    formatTime,
    NaNGuard,
    ratioToHealth,
  } from "../../helpers/format";
  import { size } from "../../helpers/constants";
  import { webtorrents } from "../../store/webtorrents";
  import { torrents } from "../../store/torrents";

  export let torrentId: number;

  $: webtorrent = $webtorrents[torrentId] || {};
  $: torrent = $torrents[torrentId];

  $: fileSize = Number(torrent?.searchResult.filesize) || 0;
  $: downloadSpeed = webtorrent.downloadSpeed || 0;
  $: uploadSpeed = webtorrent.uploadSpeed || 0;
  $: downloaded = webtorrent.downloaded || 0;
  $: timeRemaining = NaNGuard(webtorrent.timeRemaining / 1000); // seconds
  $: length = webtorrent.length || 0;
  $: numPeers = webtorrent.numPeers || 0;
  $: percentComplete = NaNGuard(
    Number(((downloaded / length) * 100)?.toFixed(0))
  );
  $: date = formatDate(torrent?.searchResult?.date || "");
  $: seeders =
    torrent.pauseState !== "running"
      ? 0
      : Number(torrent.searchResult.seeders) || 0;
  $: ratio = numPeers > 0 ? Math.floor(seeders / numPeers) : seeders;
  $: health = ratioToHealth(ratio);

  $: overviewItems = [
    { term: "Torrent size", detail: formatFileSize(fileSize) },
    { term: "Download speed", detail: formatFileSize(downloadSpeed) },
    { term: "Download percentage", detail: percentComplete },
    { term: "Upload speed", detail: formatFileSize(uploadSpeed) },
    { term: "Time remaining", detail: formatTime(timeRemaining) },
    { term: "Peers", detail: numPeers },
    { term: "Torrent health", detail: health.label, color: health.color },
    { term: "Date created", detail: date },
  ];
</script>

<style lang="scss">
  .overview {
    h2 {
      margin-bottom: var(--u);
    }
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .overview_detail_item {
    margin-bottom: var(--u2);
    margin-right: var(--u2);
  }
  dl dt {
    margin-bottom: var(--u);
    color: var(--copy-primary);
  }
  .overview_detail_item_term {
    font-weight: bold;
  }

  .torrent_file_list {
    overflow-x: auto;
    width: 100%;
    margin-bottom: var(--u2);
  }
  .torrent_file_list_item {
    width: 100%;
    min-width: max-content;
    display: grid;
    gap: var(--u);
    grid-template-columns: auto var(--u2) 1fr;
    justify-content: center;
    align-items: center;
    padding: calc(var(--u) / 2);
    border-bottom: 1px solid var(--copy-primary);
    span {
      display: flex;
      align-items: center;
    }
  }
</style>

<section class="overview">
  <h2>Overview</h2>
  <dl>
    {#each overviewItems as item}
      <div class="overview_detail_item">
        <dt class="overview_detail_item_term">{item.term}</dt>
        <dd style={item.color ? `color: var(--${item.color})` : ""}>
          {item.detail}
        </dd>
      </div>
    {/each}
  </dl>
  <!-- TorrentFileList -->
  <h2>Files</h2>
  <ul class="torrent_file_list">
    {#each webtorrent.files || [] as file}
      <li class="torrent_file_list_item">
        <span>
          {formatFileSize(file.length)}
        </span>
        <span>
          {#if file.done}
            <CheckIcon size={`${Number(size.u) * 1.5}`} />
          {:else}
            <Diamonds
              size={Number(size.u3)}
              color="var(--copy-primary)"
              unit="px"
            />{/if}
        </span>
        <span>
          {file.name}
        </span>
      </li>
    {:else}
      Could not get file data :(
    {/each}
  </ul>
</section>
