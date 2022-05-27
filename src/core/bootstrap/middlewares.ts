import { errors } from 'celebrate';
import express from 'express';
import { handleHttpError, isHttpError } from '../errors';
import { ILogger, LoggerFactory } from '../logger';
import { getContainer } from './container';

export function errorHandler(app: express.Application) {
  const logger: ILogger =
    getContainer().get<LoggerFactory>('ILogger')('ERROR_HANDLER');
  app.use(
    errors({
      statusCode: 422,
    }),
  );
  app.use(
    (
      err: Error,
      _1: express.Request,
      res: express.Response,
      _2: express.NextFunction,
    ) => {
      logger.logError(err.message);
      if (isHttpError(err)) return handleHttpError(err, res);
      else res.status(500).send('unexpected error happened');
    },
  );
}
