require("../_types/adapter");

/**
 * Transforms vendor response object to NekoStorm compatible response object
 * @param {import("../_types/vendor").AnimeToshoTorrent} animetosho
 * @returns {NekoResponse} nekostorm
 */
const sanitise = (animetosho) => {
  if (animetosho.status === "processing") {
    return undefined;
  }
  let source;
  if (animetosho.nyaa_id) {
    source = "nyaasi";
  }
  if (animetosho.tosho_id) {
    source = "tokyotosho";
  }
  if (animetosho.anidex_id) {
    source = "anidex";
  }
  return {
    id: animetosho.id,
    name: animetosho.title,
    hash: animetosho.info_hash,
    date: new Date(animetosho.timestamp * 1000).toISOString(),
    filesize: animetosho.total_size,
    category: null,
    sub_category: null,
    magnet: animetosho.magnet_uri,
    torrent: animetosho.torrent_url,
    seeders: animetosho.seeders || 0,
    leechers: animetosho.leechers || 0,
    description: null,
    source: source,
    original: animetosho,
  };
};

module.exports = sanitise;
