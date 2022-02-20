import twilio from 'twilio';
import mail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

import { client, withHandler } from '@libs/server/index';
import type { ResponseType } from '@customTypes/index';

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!, // unable to set 'phone' from req.body, cause this is test account
  //     body: `Your login token is ${payload}.`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const emailMsg = await mail.send({
  //     from: 'cheonaru@gmail.com',
  //     to: 'cheonaru@naver.com',
  //     subject: 'Your Carrot Market Verification Email',
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(emailMsg);
  // }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
