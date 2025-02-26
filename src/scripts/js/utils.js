'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.copyFiles =
  exports.rmDir =
  exports.logFromTo =
  exports.copyDir =
    void 0;
const promises_1 = __importDefault(require('node:fs/promises'));
const node_path_1 = require('node:path');
const copyDir = async (dirFrom, dirTo, include = null, exclude = null) => {
  const dir = await promises_1.default.opendir(dirFrom);
  let counter = 0;
  for await (const item of dir) {
    const { name } = item;
    if (item.isDirectory()) {
      const nextDirFrom = (0, node_path_1.join)(dirFrom, name);
      const nextDirTo = (0, node_path_1.join)(dirTo, name);
      console.log('[o] read', nextDirFrom);
      let created = false;
      try {
        await promises_1.default.access(nextDirTo);
      } catch (e) {
        console.log('[+] create dir', nextDirTo);
        await promises_1.default.mkdir(nextDirTo);
        created = true;
      }
      const count = await (0, exports.copyDir)(
        nextDirFrom,
        nextDirTo,
        include,
        exclude,
      );
      if (!count && created) {
        console.log('[-] remove dir:', nextDirTo);
        await promises_1.default.rmdir(nextDirTo);
      }
      counter += count;
      continue;
    }
    if (exclude && exclude.includes(dirFrom)) continue;
    if (include && !include.includes(dirFrom)) continue;
    const filePathFrom = (0, node_path_1.join)(dirFrom, name);
    const filePathTo = (0, node_path_1.join)(dirTo, name);
    promises_1.default.copyFile(filePathFrom, filePathTo);
    counter++;
    console.log('--> copying', name);
  }
  console.log('<> total:', counter, dirFrom);
  // dir.close();
  return counter;
};
exports.copyDir = copyDir;
const logFromTo = (from, to) => {
  console.log('\nfrom', from);
  console.log('to', to, '\n');
};
exports.logFromTo = logFromTo;
const rmDir = async (dirToDel) => {
  const dir = await promises_1.default.opendir(dirToDel);
  let counter = 0;
  for await (const item of dir) {
    const { name } = item;
    if (item.isDirectory()) {
      const nextDirToDel = (0, node_path_1.join)(dirToDel, name);
      const count = await (0, exports.rmDir)(nextDirToDel);
      counter += count;
      continue;
    }
    const filePathToDel = (0, node_path_1.join)(dirToDel, name);
    await promises_1.default.rm(filePathToDel);
    counter++;
  }
  await promises_1.default.rmdir(dirToDel);
  return counter;
};
exports.rmDir = rmDir;
const copyFiles = async (filesToCopy) => {
  for (const [from, to] of filesToCopy) {
    console.log('--> copying', from, '-->', to);
    await promises_1.default.copyFile(from, to);
  }
};
exports.copyFiles = copyFiles;
//# sourceMappingURL=utils.js.map
