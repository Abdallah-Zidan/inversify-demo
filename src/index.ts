import {
  routeInfo,
  setupServer,
  commonMiddlewares,
  errorHandler,
  config,
} from './core';

const port = config.env.PORT || 3000;

async function main() {
  const app = await setupServer({
    errorHandler,
  });
  commonMiddlewares(app);
  app.listen(port, () => {
    console.log(`app ${config.appName} running at http://localhost:${port}`);
    console.log('routes registered');
    console.dir(routeInfo(), { depth: null });
  });
}

main().catch(console.error);
