<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import ResultsTable from "../organisms/ResultsTable.svelte";
  import ResultPaginator from "../molecules/ResultPaginator.svelte";
  import Search from "../organisms/Search.svelte";
  import MainLayout from "../templates/MainLayout.svelte";
  import FilterModal from "../molecules/FilterModal.svelte";
  import { updateQuery } from "../../helpers/query";
  import { prevParsedQueryString } from "../../store/basic";
  import defaults from "../../helpers/defaults";

  let modalOpen = false;

  if (defaults.filter.get()) {
    updateQuery(defaults.filter.get());
  }

  if ($prevParsedQueryString) {
    updateQuery($prevParsedQueryString);
  }
</script>

<style lang="scss">
  @import "../../styles/global";
  .search-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--u);
    align-items: center;
    width: 100%;

    @include media(sm) {
      grid-template-columns: 1fr;
      h2 {
        display: none;
      }
    }
  }
  .placeholder {
    color: transparent;
  }
  .table-container {
    display: grid;
    grid-template-rows: auto var(--u2);
    height: 100%;
    position: relative;
  }
</style>

<MainLayout>
  <div slot="header" class="search-header">
    <h2>Search</h2>
    <Search
      on:filterclick={() => {
        modalOpen = true;
      }}
    />
    <h2 class="placeholder">Search</h2>
  </div>
  {#if $querystring?.includes("q=")}
    <div class="table-container">
      <ResultsTable />
      <ResultPaginator />
    </div>
  {/if}
  {#if modalOpen}
    <FilterModal bind:open={modalOpen} />
  {/if}
</MainLayout>
