// node --loader ts-node/esm scripts/runGenerateTypes.ts

import { spawn } from 'child_process';

spawn('npx', ['payload', 'generate:types'], {
  stdio: 'inherit',
  shell: true,
});