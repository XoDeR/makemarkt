// npx tsx scripts/runPayloadTypes.ts

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { buildConfig } from 'payload';
import { generateTypes } from '../node_modules/payload/dist/bin/generateTypes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your Payload config
const configPath = path.join(__dirname, '../src/payload.config.ts');
const configURL = pathToFileURL(configPath).href;

// Dynamically import the config
const { default: configRaw } = await import(configURL);
const config = typeof configRaw === 'function' ? await configRaw() : configRaw;

if (!config.db) {
  config.db = { defaultIDType: 'text' }; // with MongoDb: text or uuid
}

// Use Payload's native buildConfig
const builtConfig = await buildConfig(config);

// Call generateTypes directly
await generateTypes(builtConfig, {
  log: true,
});
