import { beforeAll, describe, expect, it } from 'vitest';
import supertest from 'supertest';
import {
  setupServer,
  errorHandler,
  getContainer,
  dummyLogger,
} from '../../core';
import './cat.controller';

import { Application } from 'express';

let app: Application | null = null;
getContainer()
  .rebind('ILogger')
  .toDynamicValue(() => dummyLogger);

describe('tests cats module', () => {
  beforeAll(async () => {
    app = await setupServer({ errorHandler });
  });
  it('should return all cats in case of a valid GET /cats request', async () => {
    const response = await supertest(app).get('/cats').query({ check: true });
    expect(response.status).toEqual(200);
  });
  it('should return validation error in case of avalid GET /cats request without/with wrong query parametes', async () => {
    const response = await supertest(app).get('/cats');
    expect(response.status).toEqual(422);
  });
});
