<script>
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons/src";
  import Button from "../atoms/Button.svelte";
  import { size } from "../../helpers/constants";
  import { updateQuery } from "../../helpers/query";

  import { parsedQueryString, searchResults } from "../../store/basic";

  $: page = $parsedQueryString?.page || "1";

  const updatePage = (direction: "up" | "down") => () => {
    if (direction === "up") {
      updateQuery({ page: `${Number(page) + 1}` });
    }
    if (direction === "down") {
      if (page === "1") return;
      updateQuery({ page: `${Number(page) - 1}` });
    }
  };
</script>

<style>
  nav {
    margin-left: auto;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: var(--u);
  }
  span {
    line-height: var(--u2);
    vertical-align: middle;
  }
</style>

<nav>
  <span>Page {page}</span>
  <Button dense inverted color="copy-primary" on:click={updatePage("down")}
    ><ChevronLeftIcon size={size.u2} /></Button
  >
  {#if $searchResults.length === 75}
    <Button dense inverted color="copy-primary" on:click={updatePage("up")}
      ><ChevronRightIcon size={size.u2} /></Button
    >
  {/if}
</nav>
