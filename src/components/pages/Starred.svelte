<script lang="ts">
  import Masonry from "svelte-masonry/Masonry.svelte";
  import StarredCard from "../molecules/StarredCard.svelte";
  import MainLayout from "../atoms/MainLayout.svelte";
  import { size } from "../../helpers/constants";
  import { savedSearches } from "../../store/savedSearches";
  import { objToQueryString } from "../../helpers/query";
  let refreshLayout: () => Promise<void>;

  $: {
    refreshLayout?.();
    $savedSearches; // refresh layout when savedSearches changes
  }
</script>

<style lang="scss">
  // Override svelte-masonry styles
  :global(.__grid--masonry) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc(var(--u2) * 10), 1fr)
    ) !important;
  }
</style>

<MainLayout>
  <h2 slot="header">Starred</h2>
  {#if $savedSearches.length > 0}
    <Masonry bind:refreshLayout gridGap={size.u + "px"}>
      {#each $savedSearches as sS (objToQueryString(sS))}
        <StarredCard search={sS} />
      {/each}
    </Masonry>
  {:else}
    <p>Perhaps there is an ongoing show which you search every week?</p>
    <p>
      Starring searches will allow you to quickly access those search results
      again.
    </p>
  {/if}
</MainLayout>
