<script lang="ts">
  import { scale } from "svelte/transition";
  import { backOut } from "svelte/easing";

  export let count: number;
</script>

<style>
  .badge-wrapper {
    position: relative;
  }
  sup {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
    height: var(--u);
    min-width: var(--u);
    border-radius: 999px;
    background: var(--danger);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

    font-size: calc(var(--u) - 2px);
    line-height: var(--u);
    text-align: center;
  }
</style>

<div class="badge-wrapper">
  {#if count > 0}
    {#key count}
      <sup transition:scale={{ easing: backOut }}>{count}</sup>
    {/key}
  {/if}
  <slot />
</div>
