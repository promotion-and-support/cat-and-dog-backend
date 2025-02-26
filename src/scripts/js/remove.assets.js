'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('./utils');
const removeAssets = async () => {
  console.log('[-- remove ASSETS dir --]\n');
  await (0, utils_1.rmDir)('./public/assets');
};
removeAssets();
//# sourceMappingURL=remove.assets.js.map
