import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/update.types';
import collectionsUpdate from '../repository/update.repository';
import Logging from '@src/library/logging';

export default async function updateCollections({
  user_id,
  collection_id,
  name,
  description,
}: {
  user_id: number;
  collection_id: number;
  name: string | undefined;
  description: string | undefined;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the update operation using the repository function
    await collectionsUpdate({ user_id, collection_id, name, description });
  } catch (err: any) {
    Logging.error(`[COLLECTIONS] UPDATE Error: ${err} for user_id: ${user_id}`);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
