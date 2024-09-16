import { PrismaClient } from '@prisma/client';
import Logging from '@src/library/logging';

const prisma = new PrismaClient();

export default async function connectDatabase() {
  try {
    await prisma.$connect();
    Logging.info('Successfully connected to the database');
  } catch (error) {
    Logging.error('Failed to connect to the database');
    Logging.error(error);
    process.exit(1);
  }
}



