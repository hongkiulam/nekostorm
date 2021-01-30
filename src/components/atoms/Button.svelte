<script lang="ts">
  import type { Colors } from "src/types/colors";

  export let color: Colors = "primary";
  export let inverted: boolean = false;
  export let dense: boolean = false;
</script>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--button-color);
    color: var(--white);
    height: var(--u2);
    padding: 0 var(--u);
    line-height: 1rem;
    cursor: pointer;
  }
  .inverted {
    background: transparent;
    color: var(--button-color);
  }
  .dense {
    padding: 0;
  }
</style>

<button
  on:click
  style="--button-color: var(--{color})"
  class:inverted
  class:dense
>
  <slot />
</button>
