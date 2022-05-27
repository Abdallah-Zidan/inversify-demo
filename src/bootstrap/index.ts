import express from 'express';
import containerServer from './setup';

const rawApp = express();
rawApp.use(express.json());

const server = containerServer(rawApp);
let app: express.Application | null = null;
export default async (config?: any) => {
  if (!app) app = server.build();
  return app;
};
export * from './setup';
