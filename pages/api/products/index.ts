import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  console.log(user);
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      imageUrl: 'not implemented yet',
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  }),
);
