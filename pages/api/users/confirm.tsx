import type { ResponseType } from '@customTypes/index';
import { client, withHandler } from '@libs/server/index';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  const tokenWithUser = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!tokenWithUser) res.status(404).end();

  req.session.user = {
    id:tokenWithUser?userId
  }
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password: 'sodkfo90whgodjwognwoeriroghtutq;sofufbsofjrgbaoasdi',
});
