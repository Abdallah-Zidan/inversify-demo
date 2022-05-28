import express from 'express';
import 'reflect-metadata';
import {
  ConfigFunction,
  getRouteInfo,
  InversifyExpressServer,
} from 'inversify-express-utils';
import { buildProviderModule } from 'inversify-binding-decorators';

import { getContainer } from './container';

import { buildLgger } from '../logger';
const container = getContainer();

container.bind('ILogger').toDynamicValue(() => buildLgger);

export function setup(
  app: express.Application,
  errorHandler?: ConfigFunction,
  middlewares?: express.Handler[],
) {
  container.load(buildProviderModule());
  if (middlewares) app.use(middlewares);
  const server = new InversifyExpressServer(container, null, null, app);
  if (errorHandler) server.setErrorConfig(errorHandler);
  return server;
}

export const routeInfo = () =>
  getRouteInfo(container).map((router) => {
    return {
      controller: router.controller,
      routes: router.endpoints?.map((endpoint) => endpoint.route),
    };
  });
