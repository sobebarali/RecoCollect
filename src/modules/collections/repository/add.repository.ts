import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function addRecommendation({
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

    if (recommendation.user_id !== collection.user_id) {
      throw new CustomError(
        'FORBIDDEN_ACTION',
        `You cannot add a recommendation that is not yours`,
        403,
      );
    }

    await prisma.collections.update({
      where: { id: collection_id },
      data: {
        recommendation_ids: {
          push: recommendation_id,
        },
      },
    });

    return { isAdded: true };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `6782349 Error adding recommendation to collections for user_id: ${user_id} collection_id: ${collection_id} recommendation_id: ${recommendation_id} , Error: ${error}`,
      );
      throw new CustomError(
        'DB_ERROR',
        `Error adding recommendation to collections`,
        500,
      );
    }
  }
}
