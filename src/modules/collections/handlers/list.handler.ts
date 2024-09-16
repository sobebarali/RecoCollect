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
  page: string;
  perPage: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    // Perform the list operation using the repository function
    await collectionsList({ user_id, page, perPage });
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
