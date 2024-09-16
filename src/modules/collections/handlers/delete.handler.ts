import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/delete.types';
import collectionsDelete from '../repository/delete.repository';
import Logging from '@src/library/logging';

export default async function deleteCollections({
  user_id,
  collection_id,
}: {
  user_id: number;
  collection_id: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    let deleteResult = await collectionsDelete({ user_id, collection_id });

    if (deleteResult.isDeleted) {
      data = {
        code: 'COLLECTION_DELETED',
        message: 'Collection deleted successfully',
      };
    }
  } catch (err: any) {
    Logging.error(`[COLLECTIONS] DELETE Error: ${err} for user_id: ${user_id}`);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
