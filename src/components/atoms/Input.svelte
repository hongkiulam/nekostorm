<script lang="ts">
  export let value: string;
  export let placeholder: string = "";
</script>

<style lang="scss">
  input {
    height: var(--u3);
    padding: 0 var(--u);
    background: transparent;
    border-bottom: 1px solid var(--primary);
    width: 100%;
    color: var(--copy);
  }
</style>

<input type="text" bind:value {placeholder} on:change />
