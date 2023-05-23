import { hash as hashFunc } from 'argon2';
import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const seeds = [seedUsers];

  seeds
    .reduce<Promise<PrismaClient>>(async (_acc, seed) => {
      const acc = await _acc;
      return Promise.resolve(seed(acc));
    }, Promise.resolve(prisma))
    .then(async (prisma) => {
      console.log('Successfully seeded database');
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

const USERS = [
  {
    email: 'test@gmail.com',
    name: 'test',
  },
];

export async function seedUsers(client: PrismaClient) {
  const hash = await hashFunc(process.env.SEED_USER_PASSWORD);
  return USERS.reduce<Promise<PrismaClient>>(async (_client, user) => {
    const client = await _client;
    await client.user.create({ data: { ...user, hash } });
    return Promise.resolve(client);
  }, Promise.resolve(client));
}

main();
