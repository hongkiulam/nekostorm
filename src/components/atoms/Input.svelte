<script lang="ts">
  export let value: string;
  export let placeholder: string = "";
  export let select = false;
  export let options: { label: string; value: string }[] = [];
</script>

<style lang="scss">
  input,
  select {
    height: var(--u3);
    padding: 0 var(--u);
    background: transparent;
    border-bottom: 1px solid var(--primary);
    width: 100%;
    color: var(--copy);
  }
  select option {
    color: black;
  }
</style>

{#if select}
  <select bind:value>
    {#each options as { label, value }}
      <option {value}>{label}</option>
    {/each}
  </select>
{:else}
  <input type="text" bind:value {placeholder} on:change />
{/if}
