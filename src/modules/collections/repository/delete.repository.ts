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
        `Collection not found for user: ${user_id}`,
        404,
      );
    }

    await prisma.collections.delete({
      where: { id: collection_id },
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `54536767 Error deleting collection ${collection_id} for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError(
        'DB_ERROR',
        `Error deleting collection ${collection_id} for user: ${user_id}`,
        500,
      );
    }
  }
}
