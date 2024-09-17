import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('ADD RECOMMENDATION TO COLLECTIONS - ERROR', () => {
  test('should fail to add a recommendation to a collections as user doen exits', async () => {
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
        user_id: 2147483647, //<--- Wrong user id
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(404);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        statusCode: 404,
      },
    });
  });
  test('should fail to add a recommendation to a collections as collection_id doen exits', async () => {
    const user_id = 1;
    const collection_id = 2147483647; // <--- wrong collection_id
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(404);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'COLLECTION_NOT_FOUND',
        message: 'Collection not found',
        statusCode: 404,
      },
    });
  });
  test('should fail to add a recommendation to a collections as recommendation_id doen exits', async () => {
    const user_id = 1;
    const collection_id = 1;
    const recommendation_id = 2147483647; // <--- wrong recommendation_id

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(404);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'RECOMMENDATION_NOT_FOUND',
        message: 'Recommendation not found',
        statusCode: 404,
      },
    });
  });

  test('should fail to add a recommendation to a collections of other user', async () => {
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

    let collection_id = collectionCreate.body.data.collection_id;
    let recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id: 7, //<--- other user, user 1 created the collection but user 2 is trying to add to this collection
        recommendation_id,
      });

    console.log(`response.body`, addRecommendationToCollection.body);

    expect(addRecommendationToCollection.status).toBe(403);

    expect(addRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'FORBIDDEN_ACTION',
        message:
          'You can only add your own recommendations to your own collections',
        statusCode: 403,
      },
    });
  });

  test('should fail to add a recommendation to a collections as the recommendation already exist ', async () => {
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

    let collection_id = collectionCreate.body.data.collection_id;
    let recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    expect(addRecommendationToCollection.status).toBe(200);

    const againAddingRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    console.log(`response.body`, againAddingRecommendationToCollection.body);

    expect(againAddingRecommendationToCollection.status).toBe(400);

    expect(againAddingRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'RECOMMENDATION_ALREADY_PRESENT',
        message: 'Recommendation is already added to the collection',
        statusCode: 400,
      },
    });
  });
});
