import 'module-alias/register';
import setupApplication, { routeInfo } from './bootstrap';
import config from '@config';

const port = config.env.PORT || 3000;

async function main() {
  const app = await setupApplication();
  app.listen(port, () => {
    console.log(`app ${config.appName} running at http://localhost:${port}`);
    console.log('routes registered');
    console.dir(routeInfo(), { depth: null });
  });
}

main().catch(console.error);
