<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import {
    AlertCircleIcon,
    CheckCircleIcon,
    HelpCircleIcon,
    InfoIcon,
    XIcon,
  } from "svelte-feather-icons/src";
  import type { Toast } from "../../types/toast";
  import type { Colors } from "../../types/colors";

  import { size } from "../../helpers/constants";
  import { toasts } from "../../store/toasts";

  const kindToColorMap: { [key in Toast["kind"]]: Colors } = {
    danger: "danger",
    info: "primary",
    success: "success",
    warning: "warning",
  };
  const kindToIconMap: { [key in Toast["kind"]]: any } = {
    danger: AlertCircleIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: HelpCircleIcon,
  };
</script>

<style lang="scss">
  @import "../../styles/global";
  .toast-provider {
    position: fixed;
    bottom: var(--u4);
    left: calc(var(--u4) * 2);
    z-index: 10;
    & aside + aside {
      margin-top: var(--u);
    }
    @include media(xs) {
      bottom: 0px;
      left: 0px;
    }
  }
  .toast {
    background: var(--copy-bg);
    min-height: var(--u4);
    width: max-content;
    max-width: calc(100vw - calc(var(--u4) * 3));
    color: var(--toast-color);
    border: 1px solid var(--toast-color);
    display: flex;
    align-items: center;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.15);
    @include media(xs) {
      width: 100vw;
      max-width: 100%;
    }
  }
  .icon {
    flex-shrink: 0;
    background: transparent;
    width: var(--u4);
    height: var(--u4);
    display: grid;
    place-items: center;
    &.close {
      margin-left: auto;
    }
  }
  button.icon {
    cursor: pointer;
  }
  span {
    padding: var(--u) 0;
  }
</style>

<div class="toast-provider">
  {#each $toasts as toast (toast.id)}
    <aside
      class="toast"
      style="--toast-color: var(--{kindToColorMap[toast.kind]})"
      animate:flip={{ duration: 300 }}
      in:fly={{ y: 100 }}
      out:fly={{ x: 100, duration: 150 }}
    >
      <div class="icon">
        <svelte:component
          this={kindToIconMap[toast.icon || toast.kind]}
          size={size.u2}
        />
      </div>
      <span>{toast.label}</span>
      <button
        class="icon close"
        on:click={() => {
          toasts.remove(toast.id);
        }}
      >
        <XIcon size={size.u2} />
      </button>
    </aside>
  {/each}
</div>
