import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('REMOVE RECOMMENDATION TO COLLECTIONS - SUCCESS', () => {
  test('should successfully remove a recommendation to a collections', async () => {
    const user_id = 1;
    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const collectionCreate = await request(app)
      .post('/api/v1/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(collectionCreate.status).toBe(200);

    const collection_id = collectionCreate.body.data.collection_id;
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    expect(addRecommendationToCollection.status).toBe(200);

    const removeRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    console.log(`response.body`, removeRecommendationToCollection.body);

    expect(removeRecommendationToCollection.status).toBe(200);

    expect(removeRecommendationToCollection.body).toEqual({
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
