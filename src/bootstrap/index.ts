import express from 'express';
import helmet from 'helmet';
import containerServer from './setup';
import Application from './app';
const expressApp = new Application();

expressApp.app.use(helmet());
expressApp.app.use(express.json());

const server = containerServer(expressApp.app);
let app: express.Application | null = null;
export default async (config?: any) => {
  if (!app) app = server.build();
  return app;
};
export * from './setup';
