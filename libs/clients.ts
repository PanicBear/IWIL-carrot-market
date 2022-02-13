import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

client.user.create({
  data: {
    email: 'cheonaru@gmail.com',
    name: 'clarko',
  },
});
