<script lang="ts">
  import {
    DownloadCloudIcon,
    SearchIcon,
    StarIcon,
    DropletIcon,
    SettingsIcon,
  } from "svelte-feather-icons/src";
  import active from "svelte-spa-router/active";
  import { location, querystring } from "svelte-spa-router";
  import { size } from "../../helpers/constants";

  const searchRegexp = /(\/\?.*)|(\/)$/g;
  $: path = $location + "?" + $querystring;
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
    color: var(--copy-primary);
    opacity: 1 !important;
  }
</style>

<nav>
  <div class="top">
    <a href="#/" class={path.match(searchRegexp) ? "active" : ""}
      ><SearchIcon size={size.u2} /></a
    >
    <a href="#/starred" use:active={{ path: "/starred" }}
      ><StarIcon size={size.u2} /></a
    >
    <a href="#/torrents" use:active={{ path: "/torrents" }}
      ><DownloadCloudIcon size={size.u2} /></a
    >
    <button class="disabled" use:active={{ path: "/torrents/*" }}
      ><DropletIcon size={size.u2} /></button
    >
  </div>

  <div class="bottom">
    <a href="#/settings" use:active={{ path: "/settings" }}
      ><SettingsIcon size={size.u2} /></a
    >
  </div>
</nav>
