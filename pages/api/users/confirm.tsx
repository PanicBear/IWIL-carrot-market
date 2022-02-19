import type { ResponseType } from '@customTypes/index';
import { withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;

  console.log(token);
  res.status(200).end();

  // return res.json({
  //   ok: true,
  // });
}

export default withHandler('POST', handler);
