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
  page: number;
  perPage: number;
}): Promise<typeResult> {
  let data: null | typeResultData = null;
  let error: null | typeResultError = null;

  try {
    const listResult = await collectionsList({ user_id, page, perPage });

    if (listResult.isFeteched) {
      data = {
        collections: listResult.collectionsWithRecommendations.map(
          (collection: any) => ({
            user_id: collection.user_id,
            collection_id: collection.id,
            name: collection.name,
            description: collection.description,
            created_at: collection.created_at,
            recommendations: collection.recommendations.map((rec: any) => ({
              recommendation_id: rec.id,
              user_id: rec.user_id,
              title: rec.title,
              caption: rec.caption,
              pictures: rec.pictures,
              created_at: rec.created_at.getTime(),
            })),
          }),
        ),
        page: page || 1,
        perPage: perPage || listResult.collectionsWithRecommendations.length,
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
