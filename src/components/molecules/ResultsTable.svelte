<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { Diamonds } from "svelte-loading-spinners";

  import { nekoFetch } from "../../helpers/api";
  import { size } from "../../helpers/constants";
  import type { APITorrent } from "../../types/api";

  import { parsedQueryString, searchResults } from "../../store/basic";
  import ResultItem from "./ResultItem.svelte";

  let loading = false;

  $: if ($parsedQueryString.q) {
    loading = true;
    nekoFetch($querystring!)
      .then((res) => {
        $searchResults = res;
      })
      .catch(() => {
        $searchResults = [];
      })
      .finally(() => {
        loading = false;
      });
  } else {
    loading = false;
    $searchResults = [];
  }
</script>

<style lang="scss">
  @import "../../styles/global";
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
    @include media(sm) {
      &[data-header="size"],
      &[data-header="date"],
      &[data-header="source"] {
        display: none;
      }
    }
  }
  th + th {
    padding-left: var(--u);
  }

  .loading-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--copy-bg);
    opacity: 0.5;
  }
</style>

<div class="scroll-container">
  <table>
    <thead>
      <tr>
        <th data-header="source">Source</th>
        <th data-header="name">Name</th>
        <th data-header="size">Size</th>
        <th data-header="seeder">Seeders</th>
        <th data-header="leecher">Leechers</th>
        <th data-header="date">Date</th>
        <th data-header="dl"><!-- download icon --></th>
      </tr>
    </thead>
    <tbody>
      {#each $searchResults as result}
        <ResultItem item={result} />
      {/each}
    </tbody>
  </table>
</div>
{#if loading}
  <article class="loading-overlay">
    <Diamonds
      size={Number(size.u4) * 2}
      color="var(--copy-primary)"
      unit="px"
    />
  </article>
{/if}
