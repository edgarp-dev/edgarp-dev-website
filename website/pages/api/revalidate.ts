import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { query } = req;
  const { secret, path } = query;

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!path) {
    return res.status(401).json({ message: 'Invalid path' });
  }

  try {
    await res.revalidate(<string>path);
    return res.json({ revalidated: true });
  } catch (e: unknown) {
    console.error(e);
    return res.status(500).send('Error revalidating');
  }
}
