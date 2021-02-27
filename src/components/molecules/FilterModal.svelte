<script>
  import Button from "../atoms/Button.svelte";

  import Input from "../atoms/Input.svelte";
  import Modal from "../atoms/Modal.svelte";
  import { parsedQueryString } from "../../store/basic";

  import {
    sortOptions,
    sourceOptions,
    showOptions,
  } from "../../helpers/constants";
  import { updateQuery } from "../../helpers/query";
  import defaults from "../../helpers/defaults";

  export let open = false;

  let source = $parsedQueryString.source || sourceOptions[0].value;
  let user = $parsedQueryString.user || "";
  let sortOrder = sortOptions[0].value;
  if ($parsedQueryString.sort || $parsedQueryString.order) {
    sortOrder = $parsedQueryString.sort || "date";
    sortOrder += "|";
    sortOrder += $parsedQueryString.order || "false";
  }
  $: [sort, order] = sortOrder.split("|") as [SortOptions, "true" | "false"];
  let show = $parsedQueryString.show || "all";

  $: filterObj = {
    source,
    user,
    sort,
    order,
    show,
  };
  $: isDefaultFilter = defaults.filter.matches(filterObj);
</script>

<style>
  .button-group {
    display: grid;
    grid-auto-flow: column;
    gap: var(--u2);
    margin-left: auto;
    margin-top: auto !important;
  }
</style>

<Modal title="Filter search" bind:open on:close>
  <label for="">
    Source
    <Input select bind:value={source} options={sourceOptions} />
  </label>
  <label for="">
    Username
    <Input bind:value={user} />
  </label>
  <label for="">
    Sort
    <Input
      select
      bind:value={sortOrder}
      options={sortOptions.filter((opt) => {
        if (source === "animetosho") return !opt.value.includes("seeders");
        if (source === "nyaapantsu") return true;
      })}
      disabled={source === "nyaasi"}
    />
  </label>
  <label for="">
    Show
    <Input
      select
      bind:value={show}
      options={showOptions}
      disabled={source === "nyaapantsu"}
    />
  </label>
  <div class="button-group">
    <Button
      color="primary-light"
      inverted
      disabled={isDefaultFilter}
      on:click={() => {
        defaults.filter.set(filterObj);
        isDefaultFilter = true;
      }}>Set as default filter</Button
    >
    <Button
      color="warning"
      inverted
      on:click={() => {
        open = false;
      }}>Cancel</Button
    >
    <Button
      on:click={() => {
        open = false;
        updateQuery({ user, sort, order, source, show });
      }}>Save</Button
    >
  </div>
</Modal>
