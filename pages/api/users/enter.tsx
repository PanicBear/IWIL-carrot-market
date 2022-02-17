import { NextApiRequest, NextApiResponse } from 'next';
import { client, withHandler } from '@libs/server/index';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: 'Anonymous',
      ...payload,
    },
    update: {},
  });
  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  console.log(token);

  return res.status(200).end();
}

export default withHandler('POST', handler);
