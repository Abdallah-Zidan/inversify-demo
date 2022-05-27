import { apiClient } from '@japa/api-client';
import { test } from '@japa/runner';

test('cats endpoint with query parameter returns 200', async ({ client }) => {
  const result = await client.get('/cats').qs({ check: true });
  result.assertStatus(200);
});

test('cats endpoint without or with  wrong query parameter returns 422', async ({ client }) => {
  const r1 = client.get('/cats').qs({ nocheck: true });
  const r2 = client.get('/cats');
  const [result1, result2] = await Promise.all([r1, r2]);
  result1.assertStatus(422);
  result2.assertStatus(422);
});
