import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BlogPost } from '../../@types/schema';
import NotionApi from '../../src/api/NotionApi';
import PostItem from '../../src/components/PostItem';

type Props = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notionApi = new NotionApi();
  const listOfPosts = await notionApi.getListOfPosts();

  return {
    props: {
      posts: listOfPosts,
      isLoading: false,
    },
  };
};

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="flex flex-col flex-grow px-3 md:px-0">
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </main>
  );
};

export default Blog;
