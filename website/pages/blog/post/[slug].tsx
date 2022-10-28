import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { BlogPage } from '../../../@types/schema';
import BlogApi from '../../../src/blogApi';
import PostContent from '../../../src/components/PostContent';

type StaticProps = {
  postPage: BlogPage;
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;

  const blogApi = new BlogApi();
  const slug = params?.slug as string;
  const postPage = await blogApi.getBlogPage(slug);

  if (!postPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postPage,
    },
  };
};

export async function getStaticPaths() {
  const blogApi = new BlogApi();
  const posts = await blogApi.getBlogPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

const Post = ({ postPage }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { blogPost, postContent } = postPage;
  const { title, description } = blogPost;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={'og:title'} title={'og:title'} content={title} />
        <meta name={'og:type'} title={'og:type'} content={'website'} />
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={description}
        />
      </Head>
      <main>
        <PostContent content={postContent} />
      </main>
    </>
  );
};

export default Post;
