<script lang="ts">
  import { PauseIcon, PlayIcon } from "svelte-feather-icons/src";
  import { Diamonds } from "svelte-loading-spinners";
  import Button from "../atoms/Button.svelte";

  import { webtorrents } from "../../store/webtorrents";
  import { torrents } from "../../store/torrents";
  import { size } from "../../helpers/constants";
  import { toggleTorrentPause } from "../../helpers/torrent";

  export let torrentId: number;
  export let mini = false;

  $: webtorrent = $webtorrents[torrentId] || {};
  $: torrent = $torrents[torrentId] || {};
</script>

<Button
  color="warning"
  disabled={webtorrent.done}
  inverted={false}
  on:click={(e) => {
    e.stopPropagation();
    toggleTorrentPause(torrent);
  }}
  tippyProps={{ content: "Pause/ Resume" }}
  >{#if torrent.pauseState === "paused"}
    {#if mini}
      <PlayIcon size={size.u2} />
    {:else}
      Resume
    {/if}
  {:else if torrent.pauseState === "running"}
    {#if mini}
      <PauseIcon size={size.u2} />
    {:else}
      Pause
    {/if}
  {:else}
    <Diamonds size={Number(size.u2)} color="var(--white)" unit="px" />
  {/if}
</Button>
