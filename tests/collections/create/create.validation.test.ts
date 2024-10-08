import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('CREATE COLLECTIONS - VALIDATION', () => {
  test('should fail to create a collections as name is missing', async () => {
    const user_id = 1;
    const name = '';
    const description = 'Best Action Movies';

    const response = await request(app).post('/api/v1/collections').send({
      user_id,
      name,
      description,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: '"name" is not allowed to be empty',
      },
    });
  });
  test('should fail to create a collections as user_id is not a number', async () => {
    const user_id = '1'; //<--- user_id must be a number
    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const response = await request(app).post('/api/v1/collections').send({
      user_id,
      name,
      description,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: '"user_id" must be a number',
      },
    });
  });
});
