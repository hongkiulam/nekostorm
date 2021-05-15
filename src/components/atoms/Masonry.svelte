<script lang="ts">
  import { Macy } from "svelte-macy";
  import type { MacyInstance } from "svelte-macy";
  import { size } from "../../helpers/constants";

  export let disableScroll = false;
  export let recalculate = () => {};
  export let columns: number;
  export let breakAt: { [key: number]: number } = {};

  let options = {
    trueOrder: true,
    margin: Number(size.u),
    columns,
    breakAt,
  };
  let macy: MacyInstance;

  $: {
    recalculate = () => macy?.recalculate(true);
  }
</script>

<style>
  :global(#macy) {
    margin: var(--u);
  }
  .scroll-container {
    height: 100%;
    overflow: auto;
  }
  .disableScroll {
    overflow: initial;
  }
</style>

<div class="scroll-container" class:disableScroll>
  <Macy {options} bind:macy>
    <slot />
  </Macy>
</div>
