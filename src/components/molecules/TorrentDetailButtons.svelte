<script lang="ts">
  import Button from "../atoms/Button.svelte";
  import TorrentSaveButton from "./TorrentSaveButton.svelte";
  import TorrentPauseButton from "./TorrentPauseButton.svelte";
  import { removeTorrent } from "../../helpers/torrent";
  import { torrents } from "../../store/torrents";

  export let torrentId: number;

  $: torrent = $torrents[torrentId];
</script>

<style lang="scss">
  .torrent_actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--u);
  }
</style>

<div class="torrent_actions">
  <TorrentSaveButton {torrentId} />
  <TorrentPauseButton {torrentId} />
  <Button
    color="danger"
    on:click={() => {
      removeTorrent(torrent);
    }}>Remove</Button
  >
  <Button disabled color="copy-primary">Get Stream URL</Button>
</div>
