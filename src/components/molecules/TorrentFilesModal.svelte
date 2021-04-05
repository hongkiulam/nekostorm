<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from '../atoms/Modal.svelte';
  import type { WebTorrent } from '../../types/torrent';

  export let files: WebTorrent['files'];
  export let open = false;

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  .file_button {
    background: transparent;
    text-align: left;
    border-bottom: 1px solid var(--copy-primary);
    padding: var(--u) 0;
    box-shadow: 0px 3px transparent;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 1px var(--primary);
    }
  }
</style>

<Modal
  title="Select file to stream"
  {open}
  on:close={() => {
    open = false;
  }}
>
  {#each files as file, index}
    <button
      class="file_button"
      on:click={() =>
        dispatch('select', {
          index,
          file,
        })}
    >
      {file.name}
    </button>
  {:else}
    <p>No file data available</p>
  {/each}
</Modal>
