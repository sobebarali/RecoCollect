import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('LIST COLLECTIONS - SUCCESS', () => {
  test('should successfully list all collections for a user', async () => {
    const user_id = 1;
    // const page = 1;
    // const perPage = 10;

    const response = await request(app)
      .get(`/v1/api/users/${user_id}/collections`)
      // .query({ page, perPage });


    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        collections: expect.any(Object),
        collection_id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(Number),
        recommendations: expect.any(Object),
        user_id: expect.any(Number),
        title: expect.any(String),
        caption: expect.any(String),
        pictures: expect.any(Object),
        // created_at: expect.any(Number),
        users: expect.any(Object),
      },
      error: null,
    });
  });
});
