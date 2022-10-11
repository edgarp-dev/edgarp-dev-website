import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BlogPost } from '../@types/schema';
import NotionApi from '../src/api/NotionApi';
import NavBar from '../src/components/navbar';

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
  console.log(posts);

  return (
    <div className="flex h-screen w-screen bg-slate-400">
      <NavBar />
    </div>
  );
};

export default Blog;
