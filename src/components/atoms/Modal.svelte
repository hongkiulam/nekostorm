<script lang="ts">
  import { size } from "../../helpers/constants";
  import { XIcon } from "svelte-feather-icons/src";
  import { createEventDispatcher } from "svelte";

  export let open = false;
  export let title: string;

  const dispatch = createEventDispatcher();
  const closeModal = () => {
    open = false;
    dispatch("close");
  };
</script>

<style lang="scss">
  dialog {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: calc(100% - var(--u2));
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    border: 0;
    box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.1);
    background: var(--copy-bg);
    color: var(--copy);
  }
  .backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(19, 19, 19, 0.5);
  }
  .modal-content {
    position: relative;
    padding: var(--u2);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    & > :global(* + *) {
      margin-top: var(--u2);
    }
  }
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    color: var(--danger);
    cursor: pointer;
    margin-top: 0;
  }
</style>

{#if open}
  <div class="backdrop" on:click|stopPropagation={closeModal} />
  <dialog open>
    <div class="modal-content">
      {#if title}
        <h2>{title || ""}</h2>
      {/if}
      <slot />
      <button class="close-icon" on:click={closeModal}>
        <XIcon size={size.u2} />
      </button>
    </div>
  </dialog>
{/if}
