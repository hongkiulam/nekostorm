<script lang="ts">
  import { nyaa } from "../../helpers/nyaa";

  import { querystring } from "svelte-spa-router";
  import { parsedQueryString } from "../../store/basic";
  import ResultItem from "../atoms/ResultItem.svelte";
  import type { SearchResponse } from "src/types/nyaa";

  let results: SearchResponse | null;
  $: console.log($parsedQueryString);

  $: if ($querystring) {
    results = null;
    nyaa.search($querystring!).then((res) => {
      results = res;
    });
  } else {
    results = null;
  }

  $: torrents = results?.torrents || [];
</script>

<style>
  .scroll-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    position: sticky;
    top: 0;
    text-align: left;
    color: var(--copy-primary);
    background: var(--copy-bg);
    padding-bottom: var(--u);
  }
  th + th {
    padding-left: var(--u);
  }
</style>

<div class="scroll-container">
  <table>
    <thead>
      <tr>
        <th>Source</th>
        <th>Name</th>
        <th>Size</th>
        <th>Seeders</th>
        <th>Leechers</th>
        <th>Date</th>
        <th><!-- download icon --></th>
      </tr>
    </thead>
    <tbody>
      {#each torrents as result}
        <ResultItem item={result} />
      {/each}
    </tbody>
  </table>
</div>
