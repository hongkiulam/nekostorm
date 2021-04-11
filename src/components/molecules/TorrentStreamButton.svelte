<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { ChevronsRightIcon } from 'svelte-feather-icons/src';
  import Button from '../atoms/Button.svelte';
  import { size } from '../../helpers/constants';
  export let torrentId: number;
  export let mini = false;
</script>

<Button
  color="primary"
  on:click={(e) => {
    e.stopPropagation();
    push(`/stream/${torrentId}`);
  }}
  tippyProps={{ content: 'Stream' }}
  >{#if mini}
    <ChevronsRightIcon size={size.u2} />
  {:else}
    Stream torrent
  {/if}</Button
>
