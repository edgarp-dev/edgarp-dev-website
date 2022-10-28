import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BlogPost } from '../../@types/schema';
import PostItem from '../../src/components/PostItem';
import padding from '../../src/utils/padding';
import BlogApi from '../../src/blogApi';

type Props = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogApi = new BlogApi();
  const posts = await blogApi.getBlogPosts();

  return {
    props: {
      posts,
      isLoading: false,
    },
  };
};

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className={`flex flex-col flex-grow ${padding.generalPadding}`}>
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </main>
  );
};

export default Blog;
