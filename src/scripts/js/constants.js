'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BUILD_PATH = 'js';
exports.FILES_TO_COPY_FROM_BACK_TO_FRONT =
  exports.EXCLUDE_STATIC =
  exports.EXCLUDE_FROM_FRONT =
  exports.EXCLUDE_FROM_BACK =
  exports.FROM_FRONT_TO_BACK =
  exports.FROM_BACK_TO_FRONT =
  exports.FRONT_STATIC_PATH =
  exports.BACK_STATIC_PATH =
  exports.FRONT_PATH =
  exports.BACK_PATH =
    void 0;
const node_path_1 = require('node:path');
exports.BACK_PATH = './src/client';
exports.FRONT_PATH = '../cat-and-dog-frontend/src/app';
exports.BACK_STATIC_PATH = './public';
exports.FRONT_STATIC_PATH = '../cat-and-dog-frontend/dist';
exports.FROM_BACK_TO_FRONT = [
  'common',
  'common/server',
  'common/server/types',
].map((i) => (0, node_path_1.join)(exports.BACK_PATH, i));
exports.FROM_FRONT_TO_BACK = [
  'common/client',
  'common/client/connection',
  'common/client/lib',
  'common/client/services',
].map((i) => (0, node_path_1.join)(exports.FRONT_PATH, i));
exports.EXCLUDE_FROM_BACK = ['local'].map((i) =>
  (0, node_path_1.join)(exports.BACK_PATH, i),
);
exports.EXCLUDE_FROM_FRONT = ['local'].map((i) =>
  (0, node_path_1.join)(exports.FRONT_PATH, i),
);
exports.EXCLUDE_STATIC = [].map((i) =>
  (0, node_path_1.join)(exports.FRONT_STATIC_PATH, i),
);
exports.FILES_TO_COPY_FROM_BACK_TO_FRONT = [
  ['src/domain/types/util.types.ts', 'local/util.types.ts'],
  ['src/domain/types/db.types.ts', 'local/db.types.ts'],
  ['src/domain/types/net.types.ts', 'local/net.types.ts'],
  ['src/domain/types/member.types.ts', 'local/member.types.ts'],
].map(([i, j]) => [
  (0, node_path_1.resolve)(i),
  (0, node_path_1.join)(exports.FRONT_PATH, j),
]);
//# sourceMappingURL=constants.js.map
