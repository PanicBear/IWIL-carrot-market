import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  handlerFn: (req: NextApiRequest, res: NextApiResponse) => void,
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      handlerFn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
