import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('GET COLLECTIONS - ERROR', () => {
  test('should fail to get a collections', async () => {
    const user_id = undefined;
    const collection_id = undefined;

    const response = await request(app)
      .post('/api/collections/:id')
      .query({ id: 'test_id' });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toBeDefined();
  });
});
