<script>
  import { createEventDispatcher } from "svelte";
  import type { Colors } from "../../types/colors";
  import { size } from "../../helpers/constants";
  import { XIcon } from "svelte-feather-icons/src";
  const dispatch = createEventDispatcher();

  export let color: Colors = "copy-primary";
  $: cardColor = color;
</script>

<style lang="scss">
  .card {
    position: relative;
    background: transparent;
    border: 1px solid var(--card-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--u);
    padding: var(--u);
    cursor: pointer;
    box-shadow: 0px 0px 10px transparent;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 0px 0px 1px var(--card-color);
    }
  }
  .delete {
    color: var(--danger);
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    background: transparent;
  }
</style>

<button on:click class="card" style="--card-color: var(--{cardColor})">
  <slot />
  <button
    class="delete"
    on:click|stopPropagation={() => {
      dispatch("delete");
    }}
    on:mouseenter={() => {
      cardColor = "danger";
    }}
    on:mouseleave={() => {
      cardColor = color;
    }}
  >
    <XIcon size={size.u2} class="nekostorm-card-delete-icon" />
  </button>
</button>
