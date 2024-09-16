import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COLLECTIONS - SUCCESS', () => {
  test('should successfully delete a collections', async () => {
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
      .send({ user_id });

    expect(deleteCollection.status).toBe(200);

    expect(deleteCollection.body).toEqual({
      data: {
        code: 'COLLECTION_DELETED',
        message: 'Collection deleted successfully',
      },
      error: null,
    });
  });
});
