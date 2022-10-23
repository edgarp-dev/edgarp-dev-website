/* eslint-disable react/no-children-prop */
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { PostPage } from '../../@types/schema';
import NotionApi from '../../src/api/NotionApi';

type StaticProps = {
  postPage: PostPage;
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;

  const notionApi = new NotionApi();

  const slug = params?.slug as string;
  const postPage = await notionApi.getPost(slug);
  return {
    props: {
      postPage,
    },
  };
};

export async function getStaticPaths() {
  const notionApi = new NotionApi();
  const posts = await notionApi.getListOfPosts();

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
  const { post, postElements } = postPage;

  function renderPostElement(postElement: Record<string, string>): ReactNode {
    switch (postElement.type) {
      case 'h1':
        return <h1>{postElement.content}</h1>;
      case 'h2':
        return <h2>{postElement.content}</h2>;
      case 'h3':
        return <h3>{postElement.content}</h3>;
      case 'p':
        return <p>{postElement.content}</p>;
      case 'br':
        return <br />;
      case 'a':
        return (
          <a
            href={postElement.content}
            target="_blank"
            rel="noopener noreferrer">
            {postElement.content}
          </a>
        );
      case 'li':
        return <p>-{postElement.content}</p>;
      case 'code':
        return (
          <ReactMarkdown
            children={postElement.content}
            components={{
              code({ className, children, ...props }) {
                const match =
                  /language-(\w+)/.exec(className || '') || 'javascript';
                return (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <SyntaxHighlighter
                    customStyle={{ borderRadius: '5px' }}
                    wrapLines
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                );
              },
            }}
          />
        );
      case 'image':
        return <ReactMarkdown>{postElement.content}</ReactMarkdown>;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <main className="max-w-5xl mx-auto relative">
          <div className="flex items-center justify-center">
            <article>
              {postElements.map((postElement: Record<string, string>) =>
                renderPostElement(postElement),
              )}
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default Post;
