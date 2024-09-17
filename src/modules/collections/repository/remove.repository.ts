import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function removeRecommendation({
  user_id,
  collection_id,
  recommendation_id,
}: {
  user_id: number;
  collection_id: number;
  recommendation_id: number;
}) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new CustomError('USER_NOT_FOUND', 'User not found', 404);
    }

    const collection = await prisma.collections.findUnique({
      where: { id: collection_id },
    });

    if (!collection) {
      throw new CustomError(
        'COLLECTION_NOT_FOUND',
        `Collection not found`,
        404,
      );
    }

    const recommendation = await prisma.recommendations.findUnique({
      where: { id: recommendation_id },
    });

    if (!recommendation) {
      throw new CustomError(
        'RECOMMENDATION_NOT_FOUND',
        `Recommendation not found`,
        404,
      );
    }

    if (user_id !== collection.user_id || user_id !== recommendation.user_id) {
      throw new CustomError(
        'FORBIDDEN_ACTION',
        `You can only remove your own recommendations to your own collections`,
        403,
      );
    }

    if (!collection.recommendation_ids.includes(recommendation_id)) {
      throw new CustomError(
        'RECOMMENDATION_NOT_FOUND_IN_COLLECTION',
        `Recommendation is not found in the collection`,
        400,
      );
    }

    await prisma.collections.update({
      where: { id: collection_id },
      data: {
        recommendation_ids: {
          set: collection.recommendation_ids.filter(
            (id) => id !== recommendation_id,
          ),
        },
      },
    });

    return { isRemoved: true };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `9304976 Error removing recommendation from collections for user: ${user_id} collection_id: ${collection_id} recommendation_id: ${recommendation_id}, Error: ${error}`,
      );
      throw new CustomError(
        'DB_ERROR',
        `Error removing recommendation from collections`,
        500,
      );
    }
  }
}
