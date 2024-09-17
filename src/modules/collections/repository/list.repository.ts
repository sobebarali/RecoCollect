import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function collectionsList({
  user_id,
  page,
  perPage,
}: {
  user_id: number;
  page: number;
  perPage: number;
}) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new CustomError('USER_NOT_FOUND', 'User not found', 404);
    }

    const pageNumber = page || 1;
    const skip = (pageNumber - 1) * perPage;
    const take = perPage;

    let collections = await prisma.collections.findMany({
      where: { user_id: user_id },
      skip,
      take,
    });

    /**
     * {
        id: 1,
        user_id: 1,
        name: 'Alice Collection',
        description: 'Best Action Movies',
        created_at: 2024-09-16T11:32:48.244Z,
        recommendation_ids: []
      }
     */

    // Extract all recommendation IDs from collections
    const allRecommendationIds = collections.flatMap(
      (collection) => collection.recommendation_ids || [],
    );

    // Fetch recommendations for all collected recommendation_ids in a single query
    const recommendations = await prisma.recommendations.findMany({
      where: {
        id: {
          in: allRecommendationIds,
        },
      },
    });

    // Map recommendations to the corresponding collections
    const collectionsWithRecommendations = collections.map((collection) => {
      const collectionRecommendations = recommendations.filter(
        (recommendation) =>
          collection.recommendation_ids.includes(recommendation.id),
      );
      return {
        ...collection,
        recommendations: collectionRecommendations,
      };
    });

    return { isFeteched: true, collectionsWithRecommendations };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `68712379 Error fetching collections for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError('DB_ERROR', `Error fetching collections`, 500);
    }
  }
}
