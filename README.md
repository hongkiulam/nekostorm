# NekoStorm

##### Anime-torrent search and torrenting application

Uses [AnimeTosho](https://animetosho.org/), [Nyaa Pantsu API](https://nyaa.net/apidoc) and [Nyaapi](https://github.com/Kylart/Nyaapi) to search for torrents.

~~[WebTorrent](https://webtorrent.io/) for client-side torrenting~~

Client-side torrenting did not work as expected, mostly due to me not reading the docs properly. Most torrents failed to find peers as it turns out they must also be seeding via WebRTC.

The app was migrated to Electron as a result since this boasts full node integration.

_Built with Svelte, Typescript, Scss, Snowpack, WebTorrent, Electron_

---

_Used [nyaaclient](https://github.com/hongkiulam/nyaaclient) as a starting point._
