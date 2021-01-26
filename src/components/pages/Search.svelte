<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import Topbar from "../atoms/Topbar.svelte";
  import Search from "../molecules/Search.svelte";
  import Results from "../organisms/Results.svelte";
  import { parsedQueryString, searchResults } from "../../store/basic";
  import { nyaa } from "../../helpers/nyaa";
  import MainLayout from "../atoms/MainLayout.svelte";

  $: if ($querystring) {
    $searchResults = null;
    nyaa.search($querystring!).then((res) => {
      $searchResults = res;
    });
  } else {
    $searchResults = null;
  }
  $: {
    console.table($parsedQueryString);
  }
</script>

<style lang="scss">
  .search-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--u);
    width: 100%;
  }
  .placeholder {
    color: transparent;
  }
  .home_container {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
</style>

<MainLayout>
  <div slot="header" class="search-header">
    <h2>Search</h2>
    <Search />
    <h2 class="placeholder">Search</h2>
  </div>
  <div class="home_container">
    <Results show={!!$searchResults} />
  </div>
</MainLayout>
