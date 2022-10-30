import Link from 'next/link';
import { BlogPost } from '../../../@types/schema';
import colors from '../../utils/colors';
import Tag from '../common/Tag';

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
          <p className={`text-base font-thin antialiased ${colors.textColor}`}>
            {new Date(date).toDateString()}
          </p>
        </div>
        <div className="flex flex-row flex-wrap mb-2">
          {tags.map(({ id, name }) => {
            return <Tag key={id} name={name} />;
          })}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
