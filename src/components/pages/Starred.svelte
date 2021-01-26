<script lang="ts">
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import SavedSearchSidebarItem from "../molecules/SavedSearchSidebarItem.svelte";

  import { savedSearches } from "../../store/savedSearches";
  import { objToQueryString } from "../../helpers/query";
</script>

<div>
  {#each $savedSearches as sS (objToQueryString(sS))}
    <div animate:flip={{ duration: 300 }} out:fade>
      <SavedSearchSidebarItem savedSearch={sS} />
    </div>
  {/each}
</div>
