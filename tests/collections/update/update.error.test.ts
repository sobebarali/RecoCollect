import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('UPDATE COLLECTIONS - ERROR', () => {
  test('should fail to update a collections', async () => {
    const user_id = undefined;
    const collection_id = undefined;
    const name = undefined;
    const description = undefined;

    const response = await request(app).post('/api/collections').send({
      user_id,
      collection_id,
      name,
      description,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toBeDefined();
  });
});
