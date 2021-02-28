<script>
  import Button from "../atoms/Button.svelte";
  import MainLayout from "../templates/MainLayout.svelte";
  import defaults from "../../helpers/defaults";

  let isDarkMode = defaults.darkMode.get();
  let savePath = "";
  let directSave = false;

  defaults.savePath.get().then((value) => (savePath = value));
  defaults.directSave.get().then((value) => (directSave = JSON.parse(value)));

  const toggleDarkMode = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    defaults.darkMode.set(nextTheme);
    isDarkMode = !isDarkMode;
  };

  const toggleDirectSave = () => {
    defaults.directSave.set(JSON.stringify(!directSave));
    directSave = !directSave;
  };
</script>

<style lang="scss">
  article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  article h3 {
    color: var(--copy-primary);
  }
  article > :global(* + *) {
    margin-top: var(--u);
  }

  .white-space {
    margin-bottom: calc(var(--u) / 2);
    display: inline-block;
  }
  .save-path-container {
    display: flex;
    & > :global(* + *) {
      margin-left: var(--u);
    }
  }
  details > :global(* + *) {
    margin-top: var(--u);
  }
  summary {
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    color: var(--copy-primary);
  }
</style>

<MainLayout>
  <h2 slot="header">Settings</h2>
  <article>
    <details>
      <summary><h3>Theme</h3> </summary>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>
        <span class="white-space"> Dark mode </span>
        <Button on:click={toggleDarkMode}
          >Go {isDarkMode ? " light" : " dark"}</Button
        >
      </label>
    </details>
    <details>
      <summary><h3>Downloads</h3></summary>
      <label for="">
        <span class="white-space">Default save path</span>
        <div class="save-path-container">
          {#if savePath}
            <span>{savePath}</span>
          {/if}
          <Button
            on:click={() => {
              const newPath = defaults.savePath.set();
              if (newPath) {
                savePath = newPath;
              }
            }}>Select</Button
          >
          {#if savePath}
            <Button
              on:click={() => {
                savePath = defaults.savePath.set(true) || "";
              }}>Reset</Button
            >
          {/if}
        </div>
      </label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      {#if savePath}
        <label>
          <span class="white-space">
            Directly save files to default save path
          </span>
          <Button on:click={toggleDirectSave}
            >Turn {directSave ? " off" : " on"} direct save</Button
          >
        </label>
      {/if}
    </details>
  </article>
</MainLayout>
