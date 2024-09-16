import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COLLECTIONS - ERROR', () => {
  test('should fail to delete a collections as user doesnt exist', async () => {
    const user_id = 1;

    const name = 'Alice Collection';
    const description = 'Best Action Movies';

    const createCollection = await request(app)
      .post('/v1/api/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = createCollection.body.data.collection_id;

    const deleteCollection = await request(app)
      .delete(`/v1/api/collections/${collection_id}`)
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
      .post('/v1/api/collections')
      .send({
        user_id,
        name,
        description,
      });

    expect(createCollection.status).toBe(200);

    const collection_id = 2147483647; //<-- wrong collection_id

    const deleteCollection = await request(app)
      .delete(`/v1/api/collections/${collection_id}`)
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
});
