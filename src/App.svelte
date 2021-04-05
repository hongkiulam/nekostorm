<script lang="ts">
  import Router from 'svelte-spa-router';
  import Nav from './components/organisms/Nav.svelte';
  import ToastProvider from './components/organisms/ToastProvider.svelte';
  import Search from './components/pages/Search.svelte';
  import Settings from './components/pages/Settings.svelte';
  import Starred from './components/pages/Starred.svelte';
  import TorrentDetail from './components/pages/TorrentDetail.svelte';
  import Torrents from './components/pages/Torrents.svelte';
  const routes = new Map();
  routes.set('/', Search);
  routes.set('/starred', Starred);
  routes.set('/torrents', Torrents);
  routes.set('/torrents/:id?', TorrentDetail);
  routes.set('/settings', Settings);
</script>

<style lang="scss">
  .app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: [nav] var(--u4) [main] 1fr;
  }
  #modal-root {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

<div class="app">
  <Nav />
  <Router {routes} />
  <ToastProvider />
</div>
<div id="modal-root" />
