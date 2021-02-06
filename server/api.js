const si = require("./_si");
const pantsu = require("./_pantsu");
const animetosho = require("./_animetosho");
require("./_types/adapter");

exports.handler = async function (event, context) {
  // your server-side functionality
  const query = event.queryStringParameters || {};
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
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers: {
        "content-type": "application/json",
      },
    };
  }
};
