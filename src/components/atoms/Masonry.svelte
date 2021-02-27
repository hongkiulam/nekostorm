<script lang="ts">
  import { size } from "../../helpers/constants";
  import Macy from "macy";
  import { onDestroy, onMount } from "svelte";

  export let disableScroll = false;
  export let recalculate = () => {};
  export let columns: number;
  export let breakAt: { [key: number]: number } = {};

  let macy: any;
  onMount(() => {
    macy = Macy({
      container: "#masonry",
      trueOrder: true,
      margin: Number(size.u),
      columns,
      breakAt,
    });
    recalculate = () => macy?.recalculate(true);
  });

  onDestroy(() => {
    macy?.remove();
  });
</script>

<style>
  #masonry {
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
  <div id="masonry">
    <slot />
  </div>
</div>
