import { NextApiRequest, NextApiResponse } from 'next';
import { client, withHandler } from '@libs/server/index';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  });

  console.log(token);

  return res.status(200).end();
}

export default withHandler('POST', handler);
