'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const constants_1 = require('./constants');
const utils_1 = require('./utils');
const removeJs = async () => {
  console.log('[-- remove JS dir --]\n');
  await (0, utils_1.rmDir)(constants_1.BUILD_PATH);
};
removeJs();
//# sourceMappingURL=remove.js.js.map
