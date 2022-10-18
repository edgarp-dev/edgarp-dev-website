import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BlogPost } from '../@types/schema';
import NotionApi from '../src/api/NotionApi';
import NavBar from '../src/components/Navbar';
import PostItem from '../src/components/PostItem';

type Props = {
  posts: BlogPost[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const notionApi = new NotionApi();
  const listOfPosts = await notionApi.getListOfPosts();

  return {
    props: {
      posts: listOfPosts,
    },
  };
};

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex justify-center h-screen w-screen bg-slate-400">
      <NavBar />
      <main className="flex flex-col flex-grow max-w-4xl mt-14 px-8">
        {posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </main>
    </div>
  );
};

export default Blog;
