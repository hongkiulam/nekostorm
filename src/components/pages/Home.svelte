<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import Topbar from "../atoms/Topbar.svelte";
  import Search from "../molecules/Search.svelte";
  import Results from "../organisms/Results.svelte";
  import { parsedQueryString, searchResults, sidebar } from "../../store";
  import { nyaa } from "../../helpers/nyaa";

  let suspended = false;

  $: suspended = $querystring === "";

  $: if (!suspended && $querystring) {
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
  .home_container {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
  .search_suspend_controller {
    width: 100%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    height: var(--topbarheight);
  }
  .suspended {
    transform: translateY(calc(50vh - 100%));
  }
</style>

<div class="home_container">
  <Topbar
    on:starclick={() => {
      $sidebar.left = true;
    }}
    on:downloadclick={() => {
      $sidebar.right = true;
    }}
  >
    <div class="search_suspend_controller" class:suspended>
      <Search large={suspended} />
    </div>
  </Topbar>
  <Results show={!suspended} />
</div>
