import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('CREATE COLLECTIONS - ERROR', () => {
  test('should fail to create a collections as user doesn exist', async () => {
    const user_id = 2147483647; //<-- wrong userId
    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const response = await request(app).post('/v1/api/collections').send({
      user_id,
      name,
      description,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      data: null,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        statusCode: 404,
      },
    });
  });
});
