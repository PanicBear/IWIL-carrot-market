import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
      });
      return res.json({
        ok: true,
        profile,
      });
    case 'POST':
      const {
        body: { email, phone, name },
        session: { user },
      } = req;
      const currentUser = await client.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          email: true,
          phone: true,
          name: true,
        },
      });
      if (email && currentUser?.email !== email) {
        const isExists = await client.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });
        if (isExists) {
          return res.json({
            ok: false,
            error: 'Email already exists',
          });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
        return res.json({ ok: true });
      }
      if (phone && currentUser?.phone !== phone) {
        const isExists = await client.user.findFirst({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        });
        if (isExists) {
          return res.json({
            ok: false,
            error: 'Phone number in use',
          });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
          },
        });
        return res.json({ ok: true, message: 'not changed' });
      }
      if (name && currentUser?.name !== name) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            name,
          },
        });
        return res.json({ ok: true, message: 'not changed' });
      }
      return res.json({ ok: true });
    default:
      return res.json({
        ok: false,
        error: 'Method not allowed',
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);
