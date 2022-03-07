import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const streams = await client.stream.findMany({
        take: 10,
        skip: 20,
      });
      return res.json({
        ok: true,
        streams,
      });
    case 'POST':
      const {
        body: { name, price, description },
        session: { user },
      } = req;
      const stream = await client.stream.create({
        data: {
          name,
          price: +price,
          description,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      return res.json({
        ok: true,
        stream,
      });
    default:
      return res.json({
        ok: false,
        message: `${req.method} is not allowed`,
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);
