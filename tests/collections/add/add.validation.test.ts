import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('ADD RECOMMENDATION TO COLLECTIONS - VALIDATION', () => {
  test('should fail add a recommendation to a collections as user_id is missing', async () => {
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
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(400);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: { code: 'VALIDATION_ERROR', message: '"user_id" is required' },
    });
  });
  test('should fail add a recommendation to a collections as recommendation_id is missing', async () => {
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

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(400);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: '"recommendation_id" is required',
      },
    });
  });

  test('should fail to add a recommendation to a collection as collection_id is missing', async () => {
    const user_id = 1;
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put('/api/v1/collections/:collection_id/recommendations')
      .send({
        user_id,
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(400);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: '"collection_id" must be a number',
      },
    });
  });
});
