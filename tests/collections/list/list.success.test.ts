import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COLLECTIONS - SUCCESS', () => {
  test('should successfully list all collections for a user', async () => {
    const user_id = 1;

    const response = await request(app).get(`/api/v1/collections`).send({
      user_id,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        collections: expect.any(Array),
        page: 1,
        perPage: 10,
      },
      error: null,
    });
  });

  test('should successfully list all collections for a user with pagination', async () => {
    const user_id = 1;
    const page = 1;
    const perPage = 2;

    const response = await request(app)
      .get(`/api/v1/collections`)
      .send({
        user_id,
      })
      .query({
        page,
        perPage,
      });

    console.log(`response.body`, response.body);

    console.log(
      `response.body`,
      response.body.data.collections[0].recommendations,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        collections: expect.any(Array),
        page: 1,
        perPage: 2,
      },
      error: null,
    });
  });
});
