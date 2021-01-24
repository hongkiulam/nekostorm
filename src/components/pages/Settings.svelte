<script>
  import Button from "../atoms/Button.svelte";

  import MainLayout from "../atoms/MainLayout.svelte";

  const htmlEl = document.documentElement;

  let isDarkMode = !!(htmlEl.dataset.theme === "dark");

  const toggleDarkMode = () => {
    const nextTheme = isDarkMode ? "light" : "dark";
    htmlEl.setAttribute("data-theme", nextTheme);
    localStorage.setItem("nekostorm-darkmode", nextTheme);
    isDarkMode = !isDarkMode;
  };
</script>

<style lang="scss">
  article > :global(* + *) {
    margin-top: var(--spaceS);
  }
</style>

<MainLayout>
  <h2 slot="header">Settings</h2>
  <article>
    <h3>Dark Mode</h3>
    <Button on:click={toggleDarkMode}>Turn {isDarkMode ? " off" : " on"}</Button
    >
  </article>
</MainLayout>
