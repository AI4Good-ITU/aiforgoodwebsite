import * as migration_20260922_095318_init from './20260922_095318_init';

export const migrations = [
  {
    up: migration_20260922_095318_init.up,
    down: migration_20260922_095318_init.down,
    name: '20260922_095318_init'
  },
];
