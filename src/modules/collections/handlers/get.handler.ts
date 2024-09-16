import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/get.types';
import collectionsGet from '../repository/get.repository';
import Logging from '@src/library/logging';

export default async function getCollections({
  user_id,
  collection_id,
}: {
  user_id: number;
  collection_id: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the get operation using the repository function
    await collectionsGet({ user_id, collection_id });
  } catch (err: any) {
    Logging.error(`[COLLECTIONS] GET Error: ${err} for user_id: ${user_id}`);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
