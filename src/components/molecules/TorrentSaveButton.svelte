<script lang="ts">
  import { Diamonds } from "svelte-loading-spinners";
  import { SaveIcon } from "svelte-feather-icons/src";
  import Button from "../atoms/Button.svelte";
  import { torrents } from "../../store/torrents";
  import { webtorrents } from "../../store/webtorrents";
  import { size } from "../../helpers/constants";

  export let torrentId: number;
  export let mini = false;

  $: webtorrent = $webtorrents[torrentId] || {};
  $: torrent = $torrents[torrentId];
</script>

<Button
  color="success"
  disabled={!webtorrent.done || torrent.saveState === "saved"}
  inverted={false}
  on:click={(e) => {
    e.stopPropagation();
    // save
    torrents.save(torrent.searchResult.id);
  }}
  tippyProps={{ content: "Save" }}
>
  {#if torrent.saveState === "saving"}
    <Diamonds size={Number(size.u2)} color="var(--white)" unit="px" />
  {:else if mini}
    <SaveIcon size={size.u2} />
  {:else}
    Save
  {/if}
</Button>
