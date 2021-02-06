require("../_types/adapter");

/**
 * Transforms vendor response object to NekoStorm compatible response object
 * @param {import("../_types/vendor").NyaaPantsuTorrent} nyaapantsu
 * @returns {NekoResponse} nekostorm
 */
const sanitise = (nyaapantsu) => {
  return {
    id: nyaapantsu.id,
    name: nyaapantsu.name,
    hash: nyaapantsu.hash,
    date: nyaapantsu.date,
    filesize: nyaapantsu.filesize,
    category: nyaapantsu.category,
    sub_category: nyaapantsu.sub_category,
    magnet: nyaapantsu.magnet,
    torrent: nyaapantsu.torrent,
    seeders: nyaapantsu.seeders,
    leechers: nyaapantsu.leechers,
    description: nyaapantsu.description,
    source: "nyaapantsu",
    original: nyaapantsu,
  };
};

module.exports = sanitise;
