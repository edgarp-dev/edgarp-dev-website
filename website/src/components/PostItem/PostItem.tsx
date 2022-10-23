import Link from 'next/link';
import { BlogPost } from '../../../@types/schema';
import colors from '../../utils/colors';

type Props = {
  post: BlogPost;
};

const PostItem = ({ post }: Props) => {
  const { slug, title, date, tags } = post;

  return (
    <Link href={`/blog/post/${slug}`}>
      <div className="flex flex-col mb-8 cursor-pointer border-b border-b-amber-600">
        <div className="mb-3">
          <p
            className={`text-2xl font-bold antialiased ${colors.textColor} mb-1`}>
            {title}
          </p>
          <p className={`text-lg font-normal antialiased ${colors.textColor}`}>
            {new Date(date).toDateString()}
          </p>
        </div>
        <div className="flex flex-row flex-wrap mb-2">
          {tags.map((tag) => {
            return (
              <span
                key={tag.id}
                className="py-1 px-2 text-sm font-semibold antialiased mr-2 last::mr-0 rounded-full bg-amber-600">
                {tag.name}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
