<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { push } from "svelte-spa-router";
  import { SearchIcon, FilterIcon, StarIcon } from "svelte-feather-icons/src";
  import tippy from "sveltejs-tippy";
  import Input from "../atoms/Input.svelte";
  import { parsedQueryString } from "../../store/basic";
  import { objToQueryString, updateQuery } from "../../helpers/query";
  import { savedSearches } from "../../store/savedSearches";

  export let value: string = "";
  const dispatch = createEventDispatcher();
  let isSaved = false;

  /** Functions */
  const search = () => {
    if (value) {
      updateQuery({ q: value, page: "1" });
    }
  };

  const captureEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const toggleSaveSearch = () => {
    if (isSaved) {
      savedSearches.remove($parsedQueryString);
    } else {
      savedSearches.add($parsedQueryString);
    }
    isSaved = !isSaved;
  };

  /** Reactive Statements */
  $: if (value === "") {
    const { q, ...newQuery } = $parsedQueryString;
    push("/?" + objToQueryString(newQuery));
  }

  $: {
    isSaved = savedSearches.exists($parsedQueryString);
    $savedSearches; // savedSearches as dependency
  }

  // assign to act as a memoiser
  $: searchQuery = $parsedQueryString?.q as string;
  // update value if querystring q= value changes
  $: value = searchQuery;
</script>

<style lang="scss">
  form {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
  .button-container {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    button {
      background: transparent;
      color: var(--copy-primary);
      &.isSaved {
        color: var(--warning);
      }
    }

    :global(svg) {
      cursor: pointer;
    }
    :global(* + *) {
      margin-left: var(--u);
    }
  }
</style>

<form
  on:submit|preventDefault={search}
  on:keydown={captureEnter}
  id="search-form"
>
  <Input bind:value placeholder="Search Anime . . ." />
  <div class="button-container">
    <button
      on:click|preventDefault={() => {
        dispatch("filterclick");
      }}
      use:tippy={{
        content: "Filter Search",
      }}><FilterIcon size="24" /></button
    >
    {#if searchQuery}
      {#key isSaved}
        <!-- Block is keyed so that tooltip content reacts to isSaved variable -->
        <button
          class:isSaved
          on:click|preventDefault={toggleSaveSearch}
          use:tippy={{
            content: isSaved ? "Unstar Search" : "Star Search",
          }}><StarIcon size="24" /></button
        >
      {/key}
    {/if}
    <button><SearchIcon size="24" /></button>
  </div>
</form>
