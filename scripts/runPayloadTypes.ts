// scripts/runPayloadTypes.ts
// npx tsx scripts/runPayloadTypes.ts

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { generateTypes } from '../node_modules/payload/dist/bin/generateTypes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load pre-built config
const configPath = path.join(__dirname, '../src/payload.config.ts');
const configURL = pathToFileURL(configPath).href;

const configModule = await import(configURL);
const maybePromise = configModule.default;
const builtConfig = await maybePromise;

// console.dir(builtConfig, { depth: null }); // full introspection
// console.log('Imported config keys:', Object.keys(builtConfig));

await generateTypes(builtConfig, {
  log: true,
});
