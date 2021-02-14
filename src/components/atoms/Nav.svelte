<script lang="ts">
  import {
    DownloadCloudIcon,
    SearchIcon,
    StarIcon,
    DropletIcon,
    SettingsIcon,
  } from "svelte-feather-icons/src";
  import active from "svelte-spa-router/active";
  import { location, querystring, push } from "svelte-spa-router";
  import { size } from "../../helpers/constants";

  const searchRegexp = /(\/\?.*)|(\/)$/g;
  $: path = $location + "?" + $querystring;

  const navigate = (path: string) => () => push(path);
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

  button {
    width: var(--u4);
    height: var(--u4);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    cursor: pointer;
  }
  .disabled {
    opacity: 0.5;
    cursor: auto;
  }
  :global(a.active, button.active) {
    background: var(--copy-bg);
    color: var(--copy-primary);
    opacity: 1 !important;
  }
</style>

<nav>
  <div class="top">
    <button
      on:click={navigate("/")}
      class={path.match(searchRegexp) ? "active" : ""}
      ><SearchIcon size={size.u2} /></button
    >
    <button on:click={navigate("/starred")} use:active={{ path: "/starred" }}
      ><StarIcon size={size.u2} /></button
    >
    <button on:click={navigate("/torrents")} use:active={{ path: "/torrents" }}
      ><DownloadCloudIcon size={size.u2} /></button
    >
    <button class="disabled" use:active={{ path: "/torrents/*" }}
      ><DropletIcon size={size.u2} /></button
    >
  </div>

  <div class="bottom">
    <button on:click={navigate("/settings")} use:active={{ path: "/settings" }}
      ><SettingsIcon size={size.u2} /></button
    >
  </div>
</nav>
