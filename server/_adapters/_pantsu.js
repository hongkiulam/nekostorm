const axios = require("axios");
const sanitise = require("../_sanitisers/pantsu");
require("../_types/adapter");

/**
 * @type {Object.<string, number>}
 */
const sortMap = {
  date: 2,
  size: 4,
  seeders: 6,
};

/**
 * @type { Adapter }
 */
const pantsu = async (query) => {
  const url = new URL("https://nyaa.net/api/search");
  url.searchParams.append("c", "3_5");
  url.searchParams.append("limit", 75);
  url.searchParams.append("q", "*" + query.q);
  url.searchParams.append("page", query.page || 1);
  url.searchParams.append("user", query.user);
  url.searchParams.append("sort", sortMap[query.sort]);
  url.searchParams.append("order", query.order);

  try {
    const { data } = await axios(url.toString());
    /**@type {Array<import("./_types/vendor").NyaaPantsuTorrent>} */
    const torrents = data.torrents;

    /**@type {Array<NekoResponse>} */
    const response = torrents.map(sanitise);
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = pantsu;
