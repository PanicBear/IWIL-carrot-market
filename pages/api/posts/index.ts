import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              answers: true,
              wonderings: true,
            },
          },
        },
      });
      res.json({
        ok: true,
        posts,
      });
      break;
    case 'POST':
      const {
        body: { question },
        session: { user },
      } = req;
      const post = await client.post.create({
        data: {
          question,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({
        ok: true,
        post,
      });
      break;
    case 'PUT':
    case 'DELETE':
    default:
      res.json({
        ok: false,
        message: 'method not allowed',
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);
