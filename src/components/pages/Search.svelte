<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import ResultsTable from "../molecules/ResultsTable.svelte";
  import ResultPaginator from "../atoms/ResultPaginator.svelte";
  import Search from "../molecules/Search.svelte";
  import MainLayout from "../atoms/MainLayout.svelte";
</script>

<style lang="scss">
  .search-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--u);
    align-items: center;
    width: 100%;
  }
  .placeholder {
    color: transparent;
  }
  .table-container {
    display: grid;
    grid-template-rows: auto var(--u2);
    height: 100%;
  }
</style>

<MainLayout>
  <div slot="header" class="search-header">
    <h2>Search</h2>
    <Search />
    <h2 class="placeholder">Search</h2>
  </div>
  {#if $querystring}
    <div class="table-container">
      <ResultsTable />
      <ResultPaginator />
    </div>
  {/if}
</MainLayout>
