import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('UPDATE COLLECTIONS - SUCCESS', () => {
  test('should successfully update a collections', async () => {
    const user_id = null;
    const collection_id = null;
    const name = 'name_value';
    const description = 'description_value';

    const response = await request(app).post('/api/collections').send({
      user_id,
      collection_id,
      name,
      description,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        user_id: expect.any(Number),
        collection_id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(Object),
      },
      error: null,
    });
  });
});
