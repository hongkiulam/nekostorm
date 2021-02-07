const si = require("./_adapters/_si");
const pantsu = require("./_adapters/_pantsu");
const animetosho = require("./_adapters/_animetosho");
require("./_types/adapter");

/**
 *
 * @param {SearchParams} query
 */
module.exports = async function (query) {
  const sourceAdapters = {
    nyaasi: si,
    nyaapantsu: pantsu,
    animetosho: animetosho,
  };
  /**
   * @type {Adapter}
   */
  let get = animetosho;
  if (sourceAdapters[query.source]) {
    get = sourceAdapters[query.source];
  }
  try {
    const data = await get(query);
    return data;
  } catch (e) {
    throw e;
  }
};
