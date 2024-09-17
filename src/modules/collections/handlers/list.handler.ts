import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/list.types';
import collectionsList from '../repository/list.repository';
import Logging from '@src/library/logging';

export default async function listCollections({
  user_id,
  page,
  perPage,
}: {
  user_id: number;
  page: number | undefined;
  perPage: number | undefined;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    const listResult = await collectionsList({ user_id, page, perPage });

    if (listResult.isFeteched) {
      data = {
        collections: listResult.collections.map((collection: any) => ({
          user_id: collection.user_id,
          collection_id: collection.id,
          name: collection.name,
          description: collection.description,
          created_at: collection.created_at,
        })),
        page: page || 1,
        perPage: perPage || listResult.collections.length,
      };
    }
  } catch (err: any) {
    Logging.error(`[COLLECTIONS] LIST Error: ${err} for user_id: ${user_id}`);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
