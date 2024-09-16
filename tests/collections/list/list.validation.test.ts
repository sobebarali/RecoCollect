import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COLLECTIONS - VALIDATION', () => {
  test('should fail to list a collections', async () => {
    const user_id = undefined;
    const page = undefined;
    const perPage = undefined;

    const response = await request(app).get('/api/collectionss').send({
      user_id,
      page,
      perPage,
    });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(400);

    expect(response.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: expect.any(String),
    });
  });
});
