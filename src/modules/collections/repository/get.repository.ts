import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function collectionsGet({
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

    return collection;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `54854087 Error fetching collection ${collection_id} for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError('DB_ERROR', `Error fetching collection`, 500);
    }
  }
}
