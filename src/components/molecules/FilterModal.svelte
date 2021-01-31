<script>
  import { updateQuery } from "../../helpers/query";
  import { sortOptions, sourceOptions } from "../../helpers/constants";
  import { parsedQueryString } from "../../store/basic";

  import Button from "../atoms/Button.svelte";

  import Input from "../atoms/Input.svelte";
  import Modal from "../atoms/Modal.svelte";
  export let open = false;

  let user = $parsedQueryString.user || "";
  let sort = $parsedQueryString.sort || sortOptions[0].value;
  let source = $parsedQueryString.source || sourceOptions[0].value;
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
    Username
    <Input bind:value={user} />
  </label>
  <label for="">
    Sort
    <Input select bind:value={sort} options={sortOptions} />
  </label>
  <label for="">
    Source
    <Input select bind:value={source} options={sourceOptions} />
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
        updateQuery({ user, sort, source });
      }}>Save</Button
    >
  </div>
</Modal>
