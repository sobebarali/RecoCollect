import prisma from '@src/database/prisma';
import Logging from '@src/library/logging';
import { CustomError } from '@src/utils/customError';

export default async function collectionsCreate({
  user_id,
  name,
  description,
}: {
  user_id: number;
  name: string;
  description: string | undefined;
}) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new CustomError('USER_NOT_FOUND', 'User not found', 404);
    }

    let dbCreateCollectionResult = await prisma.collections.create({
      data: {
        user_id,
        name,
        description: description ? description : '',
      },
    });

    return { isCreated: true, dbCreateCollectionResult };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      Logging.error(
        `9304976 Error creating collections for user: ${user_id}, Error: ${error}`,
      );
      throw new CustomError('DB_ERROR', `Error creating collections`, 500);
    }
  }
}
