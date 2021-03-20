<p align='center'>
  <img src='/public/img/logo.svg' height='100px'/>
</p>
<h3 align='center'>
  Nekostorm
</h3>
<p align='center'>
  <strong>Anime-torrent search and torrenting application</strong>
</p>

---

Uses [AnimeTosho](https://animetosho.org/), [Nyaa Pantsu API](https://nyaa.net/apidoc) and [Nyaapi](https://github.com/Kylart/Nyaapi) to search for torrents.

Downloads torrents with [WebTorrent](https://webtorrent.io/).

_Built with Svelte, Typescript, Scss, Snowpack, WebTorrent, Electron_

> _Used [nyaaclient](https://github.com/hongkiulam/nyaaclient) as a starting point._

---

#### Download

You can download Nekostorm [here](https://github.com/hongkiulam/nekostorm/releases), find the desired release and download the binary files or source code from the Assets section.

> All anime available through Nekostorm are not hosted by me, they are pulled in via external APIs and scrapers i.e. AnimeTosho, Nyaa.net and Nyaa.si. By watching anime with this application you might be committing copyright violations depending on your country's laws. I do not take any responsibility.

#### Development

Run `npm start` for a basic Snowpack development server. Hosted on port `8080`

Run `npm run dev` for a Netlify-Snowpack development server which also builds the netlify serverless functions locally. Hosted on port `3000`

Run `npm run electron` for an Electron-Snowpack development build

#### Build

To build for the web simply run `npm run build`, however this is assuming the build is hosted on Netlify, otherwise the anime search feature will not work

#### Package

`electron-builder` is used to package for multiple-platforms, for convenience I've used their provided Docker images which will allow us to build for Windows and Linux.

`docker-compose up -d`

`docker run containername`

This will build the packaged apps within the container, to access the files we can use `docker cp`

`docker cp containerid:/app/out-eb ./`

#### Component Structure

The components in this project are structured based on the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) system.

In short:

`atoms` - The basic building blocks, on their own they aren't very useful but can be combined and configured into more useful components

`molecules` - Typically a collection of atoms, molecules should aim to do one task and do it well. They can range from being simple to very complex but should still be built with reuse in mind

`organisms` - Groups of atoms and molecules joined to form a notable section of the page, at this level they should be slottable into pages and still function on its own

`templates` - A component used to stitch other components together to form the basis of a page

`pages` - Usually an instance of a template, this is the highest level of fidelity and should be quite self explantory
