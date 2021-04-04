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
  import tippy from "sveltejs-tippy";
  import Badge from "../atoms/Badge.svelte";

  import { size } from "../../helpers/constants";
  import { badgeCount } from "../../store/badgeCount";

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
      use:tippy={{
        content: "Search",
        placement: "right",
      }}><SearchIcon size={size.u2} /></button
    >
    <Badge count={$badgeCount.savedSearches}>
      <button
        on:click={navigate("/starred")}
        use:active={{ path: "/starred" }}
        use:tippy={{
          content: "Saved Searches (Starred)",
          placement: "right",
        }}><StarIcon size={size.u2} /></button
      >
    </Badge>
    <Badge count={$badgeCount.torrents}>
      <button
        on:click={navigate("/torrents")}
        use:active={{ path: "/torrents" }}
        use:tippy={{
          content: "Torrents",
          placement: "right",
        }}><DownloadCloudIcon size={size.u2} /></button
      >
    </Badge>
    <button
      class="disabled"
      use:active={{ path: "/torrents/*" }}
      use:tippy={{
        content: "Torrent Detail",
        placement: "right",
      }}><DropletIcon size={size.u2} /></button
    >
  </div>

  <div class="bottom">
    <button
      on:click={navigate("/settings")}
      use:active={{ path: "/settings" }}
      use:tippy={{
        content: "Settings",
        placement: "right",
      }}><SettingsIcon size={size.u2} /></button
    >
  </div>
</nav>
