/* eslint-disable react/no-children-prop */
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { PostPage } from '../../../@types/schema';
import NotionApi from '../../../src/api/NotionApi';
import colors from '../../../src/utils/colors';
import padding from '../../../src/utils/padding';

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
        return (
          <h1 className={`${colors.textColor} text-3xl font-bold`}>
            {postElement.content}
          </h1>
        );
      case 'h2':
        return (
          <h2 className={`${colors.textColor} text-2xl font-semibold`}>
            {postElement.content}
          </h2>
        );
      case 'h3':
        return (
          <h3 className={`${colors.textColor} text-xl font-semibold`}>
            {postElement.content}
          </h3>
        );
      case 'p':
        return (
          <p className={`${colors.textColor} text-lg font-light`}>
            {postElement.content}
          </p>
        );
      case 'br':
        return <br />;
      case 'a':
        return (
          <a
            className={`${colors.textColor} text-base font-extralight`}
            href={postElement.content}
            target="_blank"
            rel="noopener noreferrer">
            {postElement.content}
          </a>
        );
      case 'li':
        return (
          <p className={`${colors.textColor} text-lg font-light`}>
            &bull;{postElement.content}
          </p>
        );
      case 'code':
        return (
          <div className="w-[360px] md:w-[740px] lg:w-full">
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
          </div>
        );
      case 'image':
        return <ReactMarkdown>{postElement.content}</ReactMarkdown>;
      default:
        return null;
    }
  }

  function renderPost(): ReactNode {
    return postElements.map((postElement: Record<string, string>) =>
      renderPostElement(postElement),
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name={'og:title'} title={'og:title'} content={post.title} />
        <meta name={'og:type'} title={'og:type'} content={'website'} />
        <meta
          name={'description'}
          title={'description'}
          content={post.description}
        />
        <meta
          name={'og:description'}
          title={'og:description'}
          content={post.description}
        />
      </Head>
      <main>
        <div
          className={`${padding.generalPadding} flex items-center justify-center`}>
          <article>{renderPost()}</article>
        </div>
      </main>
    </>
  );
};

export default Post;
