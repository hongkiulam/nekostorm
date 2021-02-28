<script lang="ts">
  import { webtorrents } from "../../store/webtorrents";

  export let params: { id: string };
  const torrentId = params.id;

  $: webtorrent = $webtorrents[Number(torrentId)];
</script>

<div>
  Torrent {torrentId}
  <pre>
    <code>
      {JSON.stringify(webtorrent, null, 2)}
    </code>
  </pre>
</div>
