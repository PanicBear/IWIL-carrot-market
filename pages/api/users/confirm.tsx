import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  const tokenWithUser = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!tokenWithUser) return res.status(404).end();

  req.session.user = {
    id: tokenWithUser.userId,
  };
  await req.session.save();
  res.json({ ok: true });
}

export default withApiSession(withHandler('POST', handler));
