<script lang="ts">
  import { onDestroy } from "svelte";
  import Masonry from "../atoms/Masonry.svelte";
  import StarredCard from "../molecules/StarredCard.svelte";
  import MainLayout from "../templates/MainLayout.svelte";
  import { savedSearches } from "../../store/savedSearches";
  import { badgeCount } from "../../store/badgeCount";
  import { objToQueryString } from "../../helpers/query";
  let recalculate = () => {};

  const refreshLayout = window.setInterval(() => {
    recalculate();
  }, 1000);
  onDestroy(() => {
    clearInterval(refreshLayout);
  });

  // reset badge count as we are viewing starred searches
  badgeCount.reset("savedSearches");
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
    <Masonry
      bind:recalculate
      columns={5}
      breakAt={{ 1300: 4, 1100: 3, 900: 2, 700: 1 }}
    >
      {#each $savedSearches as sS (objToQueryString(sS))}
        <div><StarredCard search={sS} /></div>
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
