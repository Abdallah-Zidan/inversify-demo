import express from 'express';
import { setup } from './setup';
import { app } from './app';
import { ConfigFunction } from 'inversify-express-utils';

export async function setupServer(config: ServerConfig = {}) {
  let instance: express.Application | null = null;
  if (!instance) {
    const server = setup(app(), config.errorHandler, config.middlewares);
    instance = server.build();
  }
  return instance;
}

export interface ServerConfig {
  errorHandler?: ConfigFunction;
  middlewares?: express.Handler[];
}
