const api = require("../server/_api");

exports.handler = async function (event, context) {
  // your server-side functionality
  const query = event.queryStringParameters || {};
  try {
    const data = await api(query);
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
