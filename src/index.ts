import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

import {
  routeInfo,
  setupServer,
  commonMiddlewares,
  errorHandler,
  config,
  getContainer,
  ILogger,
  LoggerFactory,
} from './core';

import { registerPassportStrategies } from './modules';
const port = config.env.PORT || 3000;

async function main() {
  await mongoose.connect(config.env.MONGO_URL + config.env.MONGO_DATABASE);
  registerPassportStrategies(passport);

  const logger: ILogger = getContainer().get<LoggerFactory>('ILogger')('main');

  const app = await setupServer({
    errorHandler,
    middlewares: [...commonMiddlewares(), morgan('dev')],
  });

  app.use((_, res) => {
    logger.logInfo('unknown route');
    res.status(404).send({ error: 'ROUTE_NOT_FOUND' });
  });

  app.listen(port, () => {
    logger.logInfo(
      `application ${config.appName} running at http://localhost:${port}`,
    );
    logger.logDebug('routes: ' + JSON.stringify(routeInfo(), null, 2));
  });
}

main().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
