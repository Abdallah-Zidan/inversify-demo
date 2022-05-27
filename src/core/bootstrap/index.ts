import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export function commonMiddlewares(app: express.Application) {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.APP_KEY || 'secret'));
  app.use(cors());
}

export { routeInfo } from './setup';
export * from './container';
export * from './server';
export * from './middlewares';
