import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('REMOVE RECOMMENDATION TO COLLECTIONS - SUCCESS', () => {
  test('should successfully remove a recommendation to a collections', async () => {
    const user_id = 1;
    const collection_id = 1;
    const recommendation_id = 1;

    const response = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    console.log(`response.body`, response.body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      data: {
        code: 'REMOVED_RECOMMENDATION',
        message: 'Recommendation successfully removed from the collection.',
        user_id,
        collection_id,
        recommendation_id,
      },
      error: null,
    });
  });
});
