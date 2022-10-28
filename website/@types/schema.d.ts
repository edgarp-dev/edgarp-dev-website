export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  tags: Tag[];
  date: string;
  description: string;
};

export type PostContentElement = {
  type: string;
  content: string;
};

export type BlogPage = {
  blogPost: BlogPost;
  postContent: PostContentElement[];
};
