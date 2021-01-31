<script>
  import { createEventDispatcher } from "svelte";
  import type { Colors } from "../../types/colors";
  import { size } from "../../helpers/constants";
  import { XIcon } from "svelte-feather-icons/src";
  const dispatch = createEventDispatcher();

  export let color: Colors = "copy-primary";
</script>

<style lang="scss">
  .card {
    position: relative;
    background: transparent;
    border: 1px solid var(--copy-primary);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--u);
    padding: var(--u);
    cursor: pointer;
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

<button on:click class="card" style="border-color: var(--{color})">
  <slot />
  <button
    class="delete"
    on:click|stopPropagation={() => {
      dispatch("delete");
    }}
  >
    <XIcon size={size.u2} class="nekostorm-card-delete-icon" />
  </button>
</button>
