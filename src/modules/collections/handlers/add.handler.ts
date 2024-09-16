import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/add.types';
import addRecommendation from '../repository/add.repository';
import Logging from '@src/library/logging';

export default async function addRecommendationToCollection({
  user_id,
  collection_id,
  recommendation_id,
}: {
  user_id: number;
  collection_id: number;
  recommendation_id: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    let addResult = await addRecommendation({
      user_id,
      collection_id,
      recommendation_id,
    });

    if (addResult.isAdded) {
      data = {
        code: 'ADDED_RECOMMENDATION',
        message: 'Recommendation successfully added to the collection.',
        user_id,
        collection_id,
        recommendation_id,
      };
    }
  } catch (err: any) {
    Logging.error(
      `[COLLECTIONS] ADD Error: ${err} for user_id: ${user_id} collection_id: ${collection_id} recommendation_id: ${recommendation_id}`,
    );
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
