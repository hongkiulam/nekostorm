<script lang="ts">
  import {
    DownloadCloudIcon,
    SearchIcon,
    StarIcon,
    DropletIcon,
    SettingsIcon,
  } from "svelte-feather-icons/src";
  import active from "svelte-spa-router/active";
</script>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: var(--primary);
    color: var(--white);
  }
  a,
  button {
    width: var(--u4);
    height: var(--u4);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
  }
  .disabled {
    opacity: 0.5;
  }
  :global(a.active, button.active) {
    background: var(--copy-bg);
    color: var(--copy);
    opacity: 1 !important;
  }
</style>

<nav>
  <div class="top">
    <a href="#/" use:active={{ path: "/" }}><SearchIcon size="24" /></a>
    <a href="#/starred" use:active={{ path: "/starred" }}
      ><StarIcon size="24" /></a
    >
    <a href="#/torrents" use:active={{ path: "/torrents" }}
      ><DownloadCloudIcon size="24" /></a
    >
    <button class="disabled" use:active={{ path: "/torrents/*" }}
      ><DropletIcon size="24" /></button
    >
  </div>

  <div class="bottom">
    <a href="#/settings" use:active={{ path: "/settings" }}
      ><SettingsIcon size="24" /></a
    >
  </div>
</nav>
