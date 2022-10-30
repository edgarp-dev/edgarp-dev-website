import React from 'react';

type Props = {
  name: string;
};

const Tag = ({ name }: Props) => {
  return (
    <span className="py-1 px-2 text-sm font-semibold antialiased mr-2 last::mr-0 rounded-full bg-amber-600">
      {name}
    </span>
  );
};

export default Tag;
