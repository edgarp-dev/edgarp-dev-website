import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { BlogPage } from '../../../@types/schema';
import BlogApi from '../../../src/blogApi';
import Tag from '../../../src/components/common/Tag';
import PostContent from '../../../src/components/PostContent';
import padding from '../../../src/utils/padding';

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
  const { date, tags } = blogPost;

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
      <main className={`${padding.generalPadding} flex flex-col`}>
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex flex-row flex-wrap mb-1">
              {tags.map(({ id, name }) => {
                return <Tag key={id} name={name} />;
              })}
            </div>
            <p className="text-base font-thin antialiased text-slate-200 mb-5">
              {new Date(date).toDateString()}
            </p>
          </div>
          <div className="flex-grow bg-blue-400"></div>
        </div>
        <PostContent content={postContent} />
      </main>
    </>
  );
};

export default Post;
