<script lang="ts">
  import { formatFileSize } from "../../helpers/format";
  import type { NyaaTorrent } from "../../types/torrent";
  import { DownloadCloudIcon, CheckIcon } from "svelte-feather-icons/src";
  import { size } from "../../helpers/constants";

  export let item: NyaaTorrent;

  let isDownloaded = false;

  const cp = { cellpadding: "0", cellspacing: "0" }; //commonprops
  const formatDate = (isoDate: string) => {
    return isoDate.slice(0, 10);
  };
  const download = () => {
    isDownloaded = true;
  };
</script>

<style lang="scss">
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
  }

  .wrap {
    white-space: normal;
  }
  .pointer {
    cursor: pointer;
  }
  .isDownloaded {
    color: var(--success);
  }
  .seeder {
    color: var(--success);
  }
  .leecher {
    color: var(--danger);
  }
</style>

<tr>
  <td {...cp}><em>NySi</em></td>
  <td class="wrap" {...cp}>{item.name}</td>
  <td {...cp}>{formatFileSize(item.filesize)}</td>
  <td class="seeder" {...cp}>{item.seeders}</td>
  <td class="leecher" {...cp}>{item.leechers}</td>
  <td {...cp}>{formatDate(item.date)}</td>
  <td {...cp} class="pointer" class:isDownloaded on:click={download}
    >{#if isDownloaded}
      <CheckIcon size={`${Number(size.u) * 1.5}`} />
    {:else}
      <DownloadCloudIcon size={`${Number(size.u) * 1.5}`} />
    {/if}
  </td>
</tr>
