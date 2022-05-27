import { assert } from '@japa/assert';
import { apiClient } from '@japa/api-client';
import { specReporter } from '@japa/spec-reporter';
import { processCliArgs, configure, run } from '@japa/runner';
import { config } from 'dotenv';
config();

const port = process.env.PORT || 3000;
/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCliArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/
configure({
  ...processCliArgs(process.argv.slice(2)),
  ...{
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    plugins: [assert(), apiClient('http://localhost:' + port)],
    reporters: [specReporter()],
    importer: (filePath) => import(filePath),
  },
});

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
run();