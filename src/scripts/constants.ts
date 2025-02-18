import { join, resolve } from 'node:path';

export const BACK_PATH = './src/client';
export const FRONT_PATH = '../cat-and-dog-frontend/src/app';
export const BACK_STATIC_PATH = './public';
export const FRONT_STATIC_PATH = '../cat-and-dog-frontend/dist';
export const FROM_BACK_TO_FRONT = [
  'common',
  'common/server',
  'common/server/types',
].map((i) => join(BACK_PATH, i));

export const FROM_FRONT_TO_BACK = [
  'common/client',
  'common/client/lib',
  'common/client/connection',
].map((i) => join(FRONT_PATH, i));

export const EXCLUDE_FROM_BACK = ['local'].map((i) => join(BACK_PATH, i));

export const EXCLUDE_FROM_FRONT = ['local'].map((i) => join(FRONT_PATH, i));

export const EXCLUDE_STATIC = [].map((i) => join(FRONT_STATIC_PATH, i));

export const FILES_TO_COPY_FROM_BACK_TO_FRONT: [string, string][] = [
  ['src/domain/types/db.types.ts', 'local/db.types.ts'],
].map(([i, j]) => [resolve(i!), join(FRONT_PATH, j!)]);
