import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { id } = req.query;
  switch (req.method) {
    case 'GET':
      const product = await client.product.findUnique({
        where: {
          id: +id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
      res.json({
        ok: true,
        product,
      });
      break;
    case 'POST':
    case 'PUT':
    case 'DELETE':
    default:
      res.json({
        ok: false,
        message: 'Method not allowed',
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
