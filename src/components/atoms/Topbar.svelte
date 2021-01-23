<script lang="ts">
  import { StarIcon, DownloadIcon } from "svelte-feather-icons";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style lang="scss">
  nav {
    display: grid;
    grid-template-areas: "lefticon search righticon";
    grid-template-columns: var(--topbariconarea) auto var(--topbariconarea);
    place-items: center;
    height: var(--topbarheight);
    gap: var(--paddingL);
  }
  .icon_button {
    cursor: pointer;
    display: contents;
  }
  .middle {
    width: 100%;
  }
</style>

<nav>
  <div
    class="icon_button"
    on:click|preventDefault|stopPropagation={() => dispatch("starclick")}
  >
    <StarIcon size="24" />
  </div>
  <div class="middle">
    <slot />
  </div>
  <div
    class="icon_button"
    on:click|preventDefault|stopPropagation={() => dispatch("downloadclick")}
  >
    <DownloadIcon size="24" />
  </div>
</nav>
