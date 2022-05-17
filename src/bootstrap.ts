import express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import { handleHttpError, isHttpError } from "./errors";
import { buildProviderModule } from "inversify-binding-decorators";

import "./loader";
import { errors } from "celebrate";

let container = new Container();
container.load(buildProviderModule());

export default (app: express.Application) => {
  const server = new InversifyExpressServer(container, null, null, app);
  server.setErrorConfig(errorHandler);
  return server;
};

function errorHandler(app: express.Application) {
  app.use(
    errors({
      statusCode: 422,
    })
  );
  app.use(
    (
      err: Error,
      _1: express.Request,
      res: express.Response,
      _2: express.NextFunction
    ) => {
      console.log(err.message);
      if (isHttpError(err)) return handleHttpError(err, res);
      else res.status(500).send("unexpected error happened");
    }
  );
}

export const routeInfo = () => getRouteInfo(container);
