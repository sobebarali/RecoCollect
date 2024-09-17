import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('ADD RECOMMENDATION TO COLLECTIONS - SUCCESS', () => {
  test('should successfully add a recommendation to a collections', async () => {
    const user_id = 1;
    const collection_id = 1;
    const recommendation_id = 2;

    const response = await request(app)
      .put(
        `/v1/api/users/${user_id}/collections/${collection_id}/recommendations`,
      )
      .send({
        recommendation_id,
      });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        code: 'ADDED_RECOMMENDATION',
        message: 'Recommendation successfully added to the collection.',
        user_id,
        collection_id,
        recommendation_id,
      },
      error: null,
    });
  });
});
