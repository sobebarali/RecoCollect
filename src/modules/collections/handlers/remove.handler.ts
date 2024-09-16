import {
  typeResult,
  typeResultData,
  typeResultError,
} from '../types/remove.types';
import removeRecommendation from '../repository/remove.repository';
import Logging from '@src/library/logging';

export default async function removeRecommendationToCollection({
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
    let removeResult = await removeRecommendation({
      user_id,
      collection_id,
      recommendation_id,
    });

    if (removeResult.isRemoved) {
      data = {
        code: 'REMOVED_RECOMMENDATION',
        message: 'Recommendation successfully removed from the collection.',
        user_id,
        collection_id,
        recommendation_id,
      };
    }
  } catch (err: any) {
    Logging.error(
      `[COLLECTIONS] REMOVE Error: ${err} for user_id: ${user_id} collection_id: ${collection_id} recommendation_id: ${recommendation_id}`,
    );
    error = {
      code: err.errorCode || 'SOMETHING_WENT_WRONG',
      message: err.message || 'Something went wrong',
      statusCode: err.statusCode || 500,
    };
  }

  return { data, error };
}
