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
          buyer: {
            select: {
              id: true,
              avatar: true,
              name: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              state: true,
              user: {
                select: {
                  id: true,
                  avatar: true,
                  name: true,
                },
              },
            },
          },
          messages: {
            select: {
              id: true,
              message: true,
              chatRoomId: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });
      if (chatRoom && chatRoom.buyer.id !== user?.id && chatRoom.product.user.id !== user?.id) {
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
