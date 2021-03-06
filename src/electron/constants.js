const path = require("path");
const os = require("os");

const TMP_PATH = path.join(os.tmpdir(), "nekostorm");

module.exports = {
  TMP_PATH,
};
