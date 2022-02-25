import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
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
      const terms = product?.name.split(' ').map((word) => ({ name: { contains: word } }));
      const relatedProducts = await client.product.findMany({
        where: {
          OR: terms,
          NOT: {
            id: product?.id,
          },
        },
      });
      res.json({
        ok: true,
        product,
        relatedProducts,
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
