import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import colors from '../../utils/colors';
import padding from '../../utils/padding';

type Props = {
  content: Record<string, string>[];
};

const PostContent = ({ content }: Props) => {
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
              // eslint-disable-next-line react/no-children-prop
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
                      // eslint-disable-next-line react/no-children-prop
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

  return (
    <div
      className={`${padding.generalPadding} flex items-center justify-center`}>
      <article>
        {content.map((postElement: Record<string, string>) =>
          renderPostElement(postElement),
        )}
      </article>
    </div>
  );
};

export default PostContent;
