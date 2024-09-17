import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/create.types';
import collectionsCreate from '../repository/create.repository';
import Logging from '@src/library/logging';

export default async function createCollections({
  user_id,
  name,
  description,
}: {
  user_id: number;
  name: string;
  description: string | undefined
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    let createResult = await collectionsCreate({ user_id, name, description });

    if (createResult.isCreated) {
      data = {
        user_id,
        collection_id: createResult.dbCreateCollectionResult.id,
        name,
        description: description || "",
      };
    }
  } catch (err: any) {
    Logging.error(`[COLLECTIONS] CREATE Error: ${err} for user_id: ${user_id}`);
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
