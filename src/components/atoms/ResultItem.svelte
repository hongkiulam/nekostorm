<script lang="ts">
  import { formatFileSize } from "../../helpers/format";
  import type { APITorrent } from "../../types/api";
  import { DownloadCloudIcon, CheckIcon } from "svelte-feather-icons/src";
  import { torrents } from "../../store/torrents";
  import { size } from "../../helpers/constants";
  import { isElectron } from "../../helpers/isElectron";

  export let item: APITorrent;

  $: isDownloaded = torrents.exists(item.id);

  const cp = { cellpadding: "0", cellspacing: "0" }; //commonprops
  const formatDate = (isoDate: string) => {
    return isoDate.slice(0, 10);
  };
  const download = () => {
    if (isElectron()) {
      if (!isDownloaded) {
        torrents.add(item);
        isDownloaded = true;
      }
    } else {
      // we are in the browser, just link them the magnet
      const a = document.createElement("a");
      a.setAttribute("href", item.magnet);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.click();
    }
  };
</script>

<style lang="scss">
  @import "../../styles/global";
  tr:hover {
    background: linear-gradient(
        rgba(124, 124, 124, 0.2),
        rgba(124, 124, 124, 0.2)
      )
      var(--copy-bg);
  }
  td {
    white-space: nowrap;
    vertical-align: middle;
    height: var(--u2);
    border-bottom: 1px solid var(--primary-light);
    padding-top: calc(var(--u) / 3);
    padding-bottom: calc(var(--u) / 3);
    & + td {
      padding-left: var(--u);
    }
    &[data-cell="name"] {
      white-space: normal;
    }
    &[data-cell="seeder"] {
      color: var(--success);
    }
    &[data-cell="leecher"] {
      color: var(--danger);
    }
    &[data-cell="dl"] {
      cursor: pointer;
    }

    @include media(sm) {
      &[data-cell="size"],
      &[data-cell="date"],
      &[data-cell="source"] {
        display: none;
      }
    }
  }

  .isDownloaded {
    color: var(--success);
  }
</style>

<tr>
  <td data-cell="source" {...cp}><em>{item.source}</em></td>
  <td data-cell="name" {...cp}>{item.name}</td>
  <td data-cell="size" {...cp}>{formatFileSize(Number(item.filesize))}</td>
  <td data-cell="seeder" {...cp}>{item.seeders}</td>
  <td data-cell="leecher" {...cp}>{item.leechers}</td>
  <td data-cell="date" {...cp}>{formatDate(item.date)}</td>
  <td data-cell="dl" {...cp} class:isDownloaded on:click={download}
    >{#if isDownloaded}
      <CheckIcon size={`${Number(size.u) * 1.5}`} />
    {:else}
      <DownloadCloudIcon size={`${Number(size.u) * 1.5}`} />
    {/if}
  </td>
</tr>
