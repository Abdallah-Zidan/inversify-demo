import {
  routeInfo,
  setupServer,
  commonMiddlewares,
  errorHandler,
  config,
} from './core';
import './modules';
const port = config.env.PORT || 3000;

async function main() {
  const app = await setupServer({
    errorHandler,
    middlewares: commonMiddlewares(),
  });

  app.listen(port, () => {
    console.log(`app ${config.appName} running at http://localhost:${port}`);
    console.dir(routeInfo(), { depth: null });
  });
}

main().catch(console.error);
