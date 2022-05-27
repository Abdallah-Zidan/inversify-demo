import dotenv from 'dotenv';
if (!global.__app__config) {
  dotenv.config();
  global.__app__config = {
    appName: 'InversifyDemo',
    env: process.env,
  };
}

export const config = global.__app__config;
