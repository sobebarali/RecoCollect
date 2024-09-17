import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('CREATE COLLECTIONS - SUCCESS', () => {
  test('should successfully create a collections', async () => {
    const user_id = 1;
    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const response = await request(app).post('/api/v1/collections').send({
      user_id,
      name,
      description,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        user_id,
        collection_id: expect.any(Number),
        name,
        description,
      },
      error: null,
    });
  });

  test('should successfully create a collections without description', async () => {
    const user_id = 1;
    const name = 'Alice Collection';
    const description = '';

    const response = await request(app).post('/api/v1/collections').send({
      user_id,
      name,
      description,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        user_id,
        collection_id: expect.any(Number),
        name,
        description,
      },
      error: null,
    });
  });
});
