<script lang="ts">
  import { ChevronsRightIcon } from 'svelte-feather-icons/src';
  import Button from '../atoms/Button.svelte';
  import TorrentFilesModal from './TorrentFilesModal.svelte';
  import { size } from '../../helpers/constants';
  import { webtorrents } from '../../store/webtorrents';
  import type { WindowWithContextBridge } from '../../types/window';
  export let torrentId: number;
  export let mini = false;

  let showStreamFileModal = false;

  $: files = $webtorrents[torrentId]?.files || [];

  const streamFile = (fileIndex: number) => {
    (window as WindowWithContextBridge).wt.stream(
      torrentId,
      fileIndex,
      (url) => {
        alert(url);
      }
    );
  };
</script>

<Button
  color="primary"
  on:click={(e) => {
    e.stopPropagation();
    showStreamFileModal = true;
  }}
  tippyProps={{ content: 'Stream' }}
  >{#if mini}
    <ChevronsRightIcon size={size.u2} />
  {:else}
    Stream torrent
  {/if}</Button
>

<TorrentFilesModal
  bind:open={showStreamFileModal}
  {files}
  on:select={(e) => {
    const fileIndex = e.detail.index;
    streamFile(fileIndex);
  }}
/>
