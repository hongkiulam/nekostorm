const axios = require("axios");
const sanitise = require("../_sanitisers/animetosho");
require("../_types/adapter");

/**
 * @type { Adapter }
 */
const pantsu = async (query) => {
  const url = new URL("https://feed.animetosho.org/json");
  url.searchParams.append("only_tor", 1);
  url.searchParams.append("filter[0][t]", "nyaa_class");
  url.searchParams.append(
    "filter[0][v]",
    query.trusted === "true" ? "trusted" : "remake"
  );
  url.searchParams.append("q", query.q);
  let order = query.sort;
  if (query.order !== undefined) {
    order += query.order === "true" ? "-a" : "-d";
  }
  url.searchParams.append("order", order);
  url.searchParams.append("page", query.page || 1);
  try {
    /**@type {Array<import('../_types/vendor').AnimeToshoTorrent>} */
    const data = (await axios(url.toString())).data;

    /**@type {Array<NekoResponse>} */
    const response = data.map(sanitise).filter((item) => item !== undefined);
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = pantsu;
