import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const {
        query: { id },
      } = req;
      console.log(id);
      const stream = await client.stream.findUnique({
        where: { id: +id },
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
    methods: ['GET'],
    handler,
  }),
);
