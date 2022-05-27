import { config } from 'dotenv';

if (!global.__app__config) {
  config();
  global.__app__config = {
    appName: 'InversifyDemo',
    env: process.env,
  };
}

export default global.__app__config;
