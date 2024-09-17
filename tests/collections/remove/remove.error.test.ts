import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('REMOVE RECOMMENDATION TO COLLECTIONS - ERROR', () => {
  test('should fail to remove a recommendation from a collections as user doen exits', async () => {
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
        user_id: 2147483647, //<--- Wrong user id
      });

    console.log(`response.body`, removeRecommendationToCollection.body);

    expect(removeRecommendationToCollection.status).toBe(404);

    expect(removeRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        statusCode: 404,
      },
    });
  });
  test('should fail to remove a recommendation from a collections as collection_id doen exits', async () => {
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
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    expect(addRecommendationToCollection.status).toBe(200);

    collection_id = 2147483647; //<--- wrong collection_id

    const removeRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    console.log(`response.body`, removeRecommendationToCollection.body);

    expect(removeRecommendationToCollection.status).toBe(404);

    expect(removeRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'COLLECTION_NOT_FOUND',
        message: 'Collection not found',
        statusCode: 404,
      },
    });
  });
  test('should fail to remove a recommendation from a collections as recommendation_id doen exits', async () => {
    const user_id = 1;
    const collection_id = 1;
    const recommendation_id = 2147483647; //<-- wrong recommendation_id

    const removeRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    console.log(`response.body`, removeRecommendationToCollection.body);

    expect(removeRecommendationToCollection.status).toBe(404);

    expect(removeRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'RECOMMENDATION_NOT_FOUND',
        message: 'Recommendation not found',
        statusCode: 404,
      },
    });
  });

  test('should fail to remove a recommendation from a collections of other user', async () => {
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

    const removeRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id: 7, //<--- other user, user 1 created the collection but user 2 is trying to add to this collection
      });

    console.log(`response.body`, removeRecommendationToCollection.body);

    expect(removeRecommendationToCollection.status).toBe(403);

    expect(removeRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'FORBIDDEN_ACTION',
        message:
          'You can only add your own recommendations to your own collections',
        statusCode: 403,
      },
    });
  });

  test('should fail to remove a recommendation from a collections as the recommendation doesn exist ', async () => {
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

    const removeRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    expect(removeRecommendationToCollection.status).toBe(200);

    const againRemoveRecommendationToCollection = await request(app)
      .put(
        `/api/v1/collections/${collection_id}/recommendations/${recommendation_id}`,
      )
      .send({
        user_id,
      });

    console.log(`response.body`, againRemoveRecommendationToCollection.body);

    expect(againRemoveRecommendationToCollection.status).toBe(400);

    expect(againRemoveRecommendationToCollection.body).toEqual({
      data: null,
      error: {
        code: 'RECOMMENDATION_NOT_FOUND_IN_COLLECTION',
        message: 'Recommendation is not found in the collection',
        statusCode: 400,
      },
    });
  });
});
