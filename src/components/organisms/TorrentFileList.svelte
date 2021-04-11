<script lang="ts">
  import { webtorrents } from '../../store/webtorrents';

  export let torrentId: number;
  export let fileIndex: number;

  $: files = $webtorrents[Number(torrentId)]?.files || [];
</script>

<style lang="scss">
  ul {
    list-style: none;
  }
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
    &.selected {
      box-shadow: 0px 1px var(--success);
      border-bottom-color: var(--success);
    }
  }
</style>

<ul>
  {#each files as file, index}
    <li>
      <button
        class="file_button"
        class:selected={index === fileIndex}
        on:click={() => {
          fileIndex = index;
        }}
      >
        {file.name}
      </button>
    </li>
  {:else}
    <p>No file data available</p>
  {/each}
</ul>
