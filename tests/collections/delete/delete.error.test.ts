import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COLLECTIONS - ERROR', () => {
  test('should fail to delete a collections as user doesnt exist', async () => {
    const user_id = 1;

    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const createCollection = await request(app)
      .post('/api/v1/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = createCollection.body.data.collection_id;

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id: 2147483647 }); //<-- wrong userId

    expect(deleteCollection.status).toBe(404);

    expect(deleteCollection.body).toEqual({
      data: null,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
        statusCode: 404,
      },
    });
  });

  test('should fail to delete a collection as it doesnt exist', async () => {
    const user_id = 1;

    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const createCollection = await request(app)
      .post('/api/v1/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = 2147483647; //<-- wrong collection_id

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id });

    expect(deleteCollection.status).toBe(404);

    expect(deleteCollection.body).toEqual({
      data: null,
      error: {
        code: 'COLLECTION_NOT_FOUND',
        message: 'Collection not found',
        statusCode: 404,
      },
    });
  });

  test('should fail to delete a collection as it belongs to other user', async () => {
    const user_id = 1;

    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const createCollection = await request(app)
      .post('/api/v1/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = createCollection.body.data.collection_id;

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id: 7 }); // <-- collection createded by user 1, but user 7 is trying to delete it

    console.log('respose: ', deleteCollection.body);
    expect(deleteCollection.status).toBe(403);

    expect(deleteCollection.body).toEqual({
      data: null,
      error: {
        code: 'FORBIDDEN_ACTION',
        message: 'You can only delete your own collection',
        statusCode: 403,
      },
    });
  });

  test('should fail to delete a collection as it contains recommendation', async () => {
    const user_id = 1;

    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const createCollection = await request(app)
      .post('/api/v1/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = createCollection.body.data.collection_id;
    const recommendation_id = 1;

    const addRecommendationToCollection = await request(app)
      .put(`/api/v1/collections/${collection_id}/recommendations`)
      .send({
        user_id,
        recommendation_id,
      });

    expect(addRecommendationToCollection.status).toBe(200);

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id });

    expect(deleteCollection.status).toBe(400);

    expect(deleteCollection.body).toEqual({
      data: null,
      error: {
        code: 'COLLECTION_NOT_EMPTY',
        message:
          'Collection is not empty. Please remove all recommendations before deleting the collection.',
        statusCode: 400,
      },
    });
  });
});
