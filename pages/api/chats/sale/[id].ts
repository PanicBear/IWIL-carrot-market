import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const {
        query: { id },
        session: { user },
      } = req;
      if (!user || !user.id) {
        return res.json({
          ok: false,
          message: 'cannot get user data',
        });
      }
      const sale = await client.sale.findUnique({
        where: {
          id: +id,
        },
        select: {
          product: {
            select: {
              id: true,
            },
          },
        },
      });
      const users = await client.chatRoom.findMany({
        where: {
          productId: sale?.product?.id,
        },
        select: {
          buyer: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      return res.json({
        ok: true,
        users,
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
    methods: ['GET'],
    handler,
  }),
);
