<script lang="ts">
  import { onDestroy } from 'svelte';

  import type { WindowWithContextBridge } from '../../types/window';

  import TorrentFileList from '../organisms/TorrentFileList.svelte';
  import MainLayout from '../templates/MainLayout.svelte';
  export let params: { id: string; fileIndex: string };

  const torrentId = Number(params.id);
  let selectedFileIndex = 0;
  let streamUrl = '';
  let streamUrlLoading = false;

  $: {
    streamUrlLoading = true;
    (window as WindowWithContextBridge).wt.stream(
      torrentId,
      selectedFileIndex,
      (url) => {
        streamUrlLoading = false;
        streamUrl = url || '';
      }
    );
  }

  onDestroy(() => {
    // kill streaming server when leaving stream page
    (window as WindowWithContextBridge).wt.killStream();
  });
</script>

<style lang="scss">
  @import '../../styles/global';

  article {
    display: grid;
    grid-template-columns: 1fr minmax(calc(var(--u4) * 5), 0.5fr);
    gap: var(--u2);
    @include media(sm) {
      grid-template-columns: initial;
      grid-auto-flow: row;
    }
  }
  .aspect-ratio {
    position: relative;
    height: auto;
    width: 100%;
    padding-bottom: 56.25%;
  }

  .video-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid var(--copy-primary);
  }
</style>

<MainLayout>
  <h2 slot="header">Stream</h2>
  <article>
    <div class="aspect-ratio">
      <div class="video-placeholder">
        <span>{streamUrlLoading ? 'Loading...' : streamUrl}</span>
      </div>
    </div>
    <TorrentFileList {torrentId} bind:fileIndex={selectedFileIndex} />
  </article>
</MainLayout>
