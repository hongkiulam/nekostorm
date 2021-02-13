<script lang="ts">
  import type { Colors } from "src/types/colors";

  export let color: Colors = "primary";
  export let inverted: boolean = false;
  export let dense: boolean = false;
  export let disabled = false;
</script>

<style lang="scss">
  $unfocussedShadow: inset 0px 0px 10px transparent;
  $focussedShadow: inset 0px 0px 0px 1px; // no color
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
    box-shadow: $unfocussedShadow, $unfocussedShadow;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: $focussedShadow rgba(255, 255, 255, 0.5),
        $focussedShadow var(--button-color);
    }
  }
  .inverted {
    background: transparent;
    color: var(--button-color);
  }
  .dense {
    padding: 0;
  }
  .disabled {
    pointer-events: none;
  }
</style>

<button
  on:click
  style="--button-color: var(--{color})"
  class:inverted
  class:dense
  class:disabled
  {disabled}
>
  <slot />
</button>
