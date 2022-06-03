import { errors } from 'celebrate';
import express from 'express';
import { handleHttpError, isHttpError } from '../errors';
import { ILogger, LoggerFactory } from '../logger';
import { getContainer } from './container';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _2: express.NextFunction,
    ) => {
      logger.logError(err.message);
      if (isHttpError(err)) return handleHttpError(err, res);
      else res.status(500).send('unexpected error happened');
    },
  );
}

export function commonMiddlewares() {
  return [
    helmet(),
    express.json({ limit: process.env.JSON_BODY_LIMIT || '50mb' }),
    express.urlencoded({
      extended: true,
      limit: process.env.URL_ENCODED_BODY_LIMIT || '50mb',
    }),
    cookieParser(process.env.APP_KEY || 'secret'),
    cors(),
  ];
}
