import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function collectionsDelete({
  user_id,
  collection_id,
}: {
  user_id: number;
  collection_id: number;
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

    if (user_id !== collection.user_id) {
      throw new CustomError(
        'FORBIDDEN_ACTION',
        `You can only delete your own collection`,
        403,
      );
    }

    if (collection.recommendation_ids.length > 0) {
      throw new CustomError(
        'COLLECTION_NOT_EMPTY',
        `Collection is not empty. Please remove all recommendations before deleting the collection.`,
        400,
      );
    }

    await prisma.collections.delete({
      where: { id: collection_id },
    });

    return { isDeleted: true };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `54536767 Error deleting collection ${collection_id} for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError('DB_ERROR', `Error deleting collection`, 500);
    }
  }
}
