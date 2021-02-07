require("../_types/adapter");

/**
 * Transforms vendor response object to NekoStorm compatible response object
 * @param {import("../_types/vendor").NyaaSiTorrent} nyaasi
 * @returns {NekoResponse} nekostorm
 */
const sanitise = (nyaasi) => {
  if (nyaasi.status === "danger") {
    return undefined;
  }
  return {
    id: Number(nyaasi.id),
    name: nyaasi.name,
    hash: nyaasi.hash,
    date: nyaasi.date,
    filesize: formatFileSize(nyaasi.filesize),
    category: nyaasi.category,
    sub_category: nyaasi.sub_category,
    magnet: nyaasi.magnet,
    torrent: nyaasi.torrent,
    seeders: nyaasi.seeders,
    leechers: nyaasi.leechers,
    description: null,
    source: "nyaasi",
    original: nyaasi,
  };
};

const formatFileSize = (filesize) => {
  const unitConversion = {
    KiB: 1024,
    MiB: 1024 * 1024,
    GiB: 1024 * 1024 * 1024,
  };
  const [size, unit] = filesize.split(" ");
  return (Number(size) * unitConversion[unit]).toString();
};

module.exports = sanitise;
