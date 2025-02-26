'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const constants_1 = require('./constants');
const utils_1 = require('./utils');
const runSync = async () => {
  console.log('copy ALL from BACK to FRONT');
  await (0, utils_1.copyDir)(constants_1.BACK_PATH, constants_1.FRONT_PATH);
};
runSync();
//# sourceMappingURL=copy.all.to.front.js.map
