import Link from 'next/link';
import { BlogPost } from '../../../@types/schema';

type Props = {
  post: BlogPost;
};

const PostItem = ({ post }: Props) => {
  const { slug, title, date, tags } = post;

  return (
    <Link href={`/post/${slug}`}>
      <div className="flex flex-col mb-8 cursor-pointer border-b border-indigo-400">
        <p className="text-2xl font-bold antialiased">{title}</p>
        <p className="text-lg font-normal antialiased">{date}</p>
        <div className="flex flex-row flex-wrap mb-2">
          {tags.map((tag) => {
            return (
              <p key={tag.id} className="font-thin antialiased mr-4">
                {tag.name}
              </p>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
