import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COLLECTIONS - SUCCESS', () => {
  test('should successfully list all collections for a user', async () => {
    const user_id = 1;
    // const page = 1;
    // const perPage = 10;

    const response = await request(app).get(
      `/v1/api/users/${user_id}/collections`,
    );
    // .query({ page, perPage });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        collections: expect.any(Array),
        page: 1,
        perPage: expect.any(Number),
      },
      error: null,
    });
  });

  test('should successfully list all collections for a user with pagination', async () => {
    const user_id = 1;
    const page = 2;
    const perPage = 10;

    const response = await request(app)
      .get(`/v1/api/users/${user_id}/collections`)
      .query({ page, perPage });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        collections: expect.any(Array),
        page: 2,
        perPage: 10,
      },
      error: null,
    });
  });
});
