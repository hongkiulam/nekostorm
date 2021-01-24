<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./components/pages/Home.svelte";
  import Settings from "./components/pages/Settings.svelte";
  import Starred from "./components/pages/Starred.svelte";
  import TorrentDetail from "./components/pages/TorrentDetail.svelte";
  import Torrents from "./components/pages/Torrents.svelte";
  const routes = new Map();
  routes.set("/", Home);
  routes.set("/starred", Starred);
  routes.set("/torrents", Torrents);
  routes.set("/torrents/:id?", TorrentDetail);
  routes.set("/settings", Settings);
</script>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;
    // overflow: hidden;
  }
</style>

<main>
  <a href="#/">home</a>
  <a href="#/?q=haikyuu">home with search</a>

  <a href="#/starred">starred</a>
  <a href="#/torrents">torrents</a>
  <a href="#/torrents/someid">torrent detail</a>
  <a href="#/settings">settings</a>
  <Router {routes} />
</main>
