import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('ADD RECOMMENDATION TO COLLECTIONS - SUCCESS', () => {
  test('should successfully add a recommendation to a collections', async () => {
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

    console.log(`response.body`, collectionCreate.body);

    expect(collectionCreate.status).toBe(200);

    const collection_id = collectionCreate.body.data.collection_id;
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(200);

    expect(addRecommendationToCollection.body).toEqual({
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
