import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/clients';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.user.create({
    data: {
      email: 'cheonaru@gmail.com',
      name: 'clarko',
    },
  });

  res.json({ ok: true, data: 'clarko' });
}
