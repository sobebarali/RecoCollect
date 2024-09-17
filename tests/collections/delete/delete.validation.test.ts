import app from '../../../src/app';
import request from 'supertest';
import { expect, describe, test } from '@jest/globals';

describe('DELETE COLLECTIONS - VALIDATION', () => {
  test('should fail to delete a collections as user_id is undefined', async () => {
    const user_id = undefined;
    const collection_id = undefined;

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id });

    console.log(`response.body`, deleteCollection.body);

    expect(deleteCollection.status).toBe(400);

    expect(deleteCollection.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: '"user_id" is required',
    });
  });
  test('should fail to delete a collections as collection_id is undefined', async () => {
    const user_id = 1;
    const collection_id = undefined;

    const deleteCollection = await request(app)
      .delete(`/api/v1/collections/${collection_id}`)
      .send({ user_id });

    console.log(`response.body`, deleteCollection.body);

    expect(deleteCollection.status).toBe(400);

    expect(deleteCollection.body.error).toEqual({
      code: 'VALIDATION_ERROR',
      message: '"collection_id" must be a number',
    });
  });
});
