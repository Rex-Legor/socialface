import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
const env = dotenv.config({ path: './.env' }).parsed;

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 6000,
  },
  env: {
    ...env,
  },
});
