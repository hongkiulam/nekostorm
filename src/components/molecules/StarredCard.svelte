<script lang="ts">
  import { push } from "svelte-spa-router";
  import {
    SearchIcon,
    BookOpenIcon,
    UserIcon,
    HardDriveIcon,
  } from "svelte-feather-icons/src";
  import Card from "../atoms/Card.svelte";
  import { size, sourceOptions } from "../../helpers/constants";
  import { capitalise } from "../../helpers/format";
  import { savedSearches } from "../../store/savedSearches";
  import { objToQueryString } from "../../helpers/query";
  import type { SavedSearch } from "../../types/savedSearch";

  export let search: SavedSearch;
</script>

<style lang="scss">
  .info {
    display: flex;
    align-items: center;
    line-height: var(--u2);
    vertical-align: middle;
    &.full-span {
      grid-column: 1/3;
    }
    :global(svg) {
      margin-right: var(--u);
    }
  }
</style>

<Card
  on:click={() => {
    push("/?" + objToQueryString(search));
  }}
  on:delete={() => {
    savedSearches.remove(search);
  }}
>
  <span class="info full-span"
    ><SearchIcon size={size.u2} />{capitalise(search.q)}</span
  >
  <span class="info"
    ><BookOpenIcon size={size.u2} />Page: {search.page || 1}</span
  >
  {#if search.user}
    <span class="info"><UserIcon size={size.u2} />{search.user}</span>
  {/if}
  {#if search.source}
    <span class="info"
      ><HardDriveIcon size={size.u2} />{sourceOptions.find(
        (opt) => opt.value === search.source
      )?.label}</span
    >
  {/if}
  <!-- sort -->
  <!-- {#if search.user}
    <span class="info"><UserIcon size={size.u2} />{search.user}</span>
  {/if} -->
</Card>
