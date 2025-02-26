'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const constants_1 = require('./constants');
const utils_1 = require('./utils');
const runSync = async () => {
  console.log('[-- copy client API from BACK to FRONT --] ');
  (0, utils_1.logFromTo)(constants_1.BACK_PATH, constants_1.FRONT_PATH);
  await (0, utils_1.copyDir)(
    constants_1.BACK_PATH,
    constants_1.FRONT_PATH,
    constants_1.FROM_BACK_TO_FRONT,
    constants_1.EXCLUDE_FROM_BACK,
  );
  console.log('\n[-- copy client API from FRONT to BACK --]');
  (0, utils_1.logFromTo)(constants_1.BACK_PATH, constants_1.FRONT_PATH);
  await (0, utils_1.copyDir)(
    constants_1.FRONT_PATH,
    constants_1.BACK_PATH,
    constants_1.FROM_FRONT_TO_BACK,
    constants_1.EXCLUDE_FROM_FRONT,
  );
  console.log('\n[-- copy STATIC from FRONT to BACK --]');
  (0, utils_1.logFromTo)(constants_1.BACK_PATH, constants_1.FRONT_PATH);
  await (0, utils_1.copyDir)(
    constants_1.FRONT_STATIC_PATH,
    constants_1.BACK_STATIC_PATH,
    null,
    constants_1.EXCLUDE_STATIC,
  );
  console.log('\n[-- copy FILES from BACK to FRONT --]\n');
  await (0, utils_1.copyFiles)(constants_1.FILES_TO_COPY_FROM_BACK_TO_FRONT);
};
runSync();
//# sourceMappingURL=sync.back.front.js.map
