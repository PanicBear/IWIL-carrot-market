import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface HandlerConfig {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({ method, handler, isPrivate = true }: HandlerConfig) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Login required' });
    }
    try {
      handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
