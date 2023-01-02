import type { NextApiRequest, NextApiResponse } from 'next';
import BlogApi from '../../src/blogApi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { query } = req;

  if (query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const blogApi = new BlogApi();
    const posts = await blogApi.getBlogPosts();

    const paths = posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    }));

    for (const path of paths) {
      const { slug } = path.params;
      await res.revalidate(`/blog/post/${slug}`);
    }

    return res.json({ revalidated: true });
  } catch (e: unknown) {
    console.error(e);
    return res.status(500).send('Error revalidating');
  }
}
