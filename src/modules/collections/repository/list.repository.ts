import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function collectionsList({
  user_id,
  page,
  perPage,
}: {
  user_id: number;
  page: string;
  perPage: number;
}) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new CustomError('USER_NOT_FOUND', 'User not found', 404);
    }

    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * perPage;
    const take = perPage;

    const collections = await prisma.collections.findMany({
      where: { id: user_id },
      skip,
      take,
    });

    return collections;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `68712379 Error fetching collections for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError(
        'DB_ERROR',
        `Error fetching collections for user: ${user_id}`,
        500,
      );
    }
  }
}
