const nyaapi = require("nyaapi");
const sanitise = require("../_sanitisers/si");
require("../_types/adapter");

/**
 * @type { Adapter }
 */
const si = async (query) => {
  const opts = {
    term: query.q,
    n: 75,
    p: query.page || 1,
    user: query.user,
    filter: 0,
    category: "1_2",
  };
  if (query.show !== "all" && query.show) {
    opts.filter = query.show === "trusted" ? 2 : 1;
  }
  let searchFunction = nyaapi.si.searchPage;
  if (query.page && query.user) {
    searchFunction = nyaapi.si.searchByUserAndByPage;
  }
  if (query.user && !query.page) {
    searchFunction = nyaapi.si.searchByUser;
  }
  try {
    /**@type {Array<import("../_types/vendor").NyaaSiTorrent>} */
    const data = await searchFunction(opts);

    /**@type {Array<NekoResponse>} */
    const response = data.map(sanitise).filter((item) => item !== undefined);
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = si;
