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
      const chatRoom = await client.chatRoom.findUnique({
        where: {
          id: +id,
        },
        select: {
          id: true,
          buyerId: true,
          product: {
            select: {
              id: true,
              name: true,
              userId: true,
              state: true,
            },
          },
          messages: true,
        },
      });
      if (chatRoom && chatRoom.buyerId !== user?.id && chatRoom.product.userId !== user?.id) {
        return res.json({
          ok: false,
          message: 'only buyer and seller can join chatRoom',
        });
      }
      return res.json({
        ok: true,
        chatRoom,
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
