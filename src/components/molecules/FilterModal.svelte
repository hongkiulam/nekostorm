<script>
  import { updateQuery } from "../../helpers/query";
  import {
    sortOptions,
    sourceOptions,
    trustedOptions,
  } from "../../helpers/constants";
  import { parsedQueryString } from "../../store/basic";

  import Button from "../atoms/Button.svelte";

  import Input from "../atoms/Input.svelte";
  import Modal from "../atoms/Modal.svelte";
  export let open = false;

  let source = $parsedQueryString.source || sourceOptions[0].value;
  let user = $parsedQueryString.user || "";
  let sortOrder = sortOptions[0].value;
  if ($parsedQueryString.sort || $parsedQueryString.order) {
    sortOrder = $parsedQueryString.sort || "date";
    sortOrder += "|";
    sortOrder += $parsedQueryString.order || "false";
  }
  $: [sort, order] = sortOrder.split("|");
  let trusted = $parsedQueryString.trusted || "";
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
    Reputation
    <Input
      select
      bind:value={trusted}
      options={trustedOptions}
      disabled={source === "nyaapantsu"}
    />
  </label>
  <div class="button-group">
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
        updateQuery({ user, sort, order, source, trusted });
      }}>Save</Button
    >
  </div>
</Modal>
