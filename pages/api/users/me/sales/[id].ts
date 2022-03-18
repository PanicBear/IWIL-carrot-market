import { ProductState } from '.prisma/client';
import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      return res.json({
        ok: true,
      });
    case 'POST':
      const {
        body: { id, kind },
        session: { user },
      } = req;
      const isSeller = Boolean(
        await client.product.findFirst({
          where: {
            userId: user?.id,
            id: +id,
          },
        }),
      );
      if (isSeller) {
        return res.json({ ok: false, message: 'only seller can change state with product' });
      }
      switch (kind as ProductState) {
        case 'onList':
          return res.json({ ok: true });
        case 'booked':
          return res.json({ ok: true });
        case 'sold':
          return res.json({ ok: true });
        default:
          return res.json({
            ok: false,
            message: 'unknown product state',
          });
      }
    default:
      res.json({
        ok: false,
        message: 'Method not allowed',
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);
