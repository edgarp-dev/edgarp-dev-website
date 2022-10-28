import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlogPage, BlogPost, Tag } from '../../@types/schema';
import MarkdownParser from './MarkdownParser';
import NotionBlogDatabase from './NotionBlogDatabase';

export default class BlogFacade {
  private readonly notionBlogDatabase: NotionBlogDatabase;

  private readonly markdownParser: MarkdownParser;

  constructor() {
    this.notionBlogDatabase = new NotionBlogDatabase();
    this.markdownParser = new MarkdownParser();
  }

  public async getPosts(): Promise<BlogPost[]> {
    const posts = await this.notionBlogDatabase.getPosts();
    const blogPosts: BlogPost[] = [];

    if (posts) {
      posts.forEach((post) => {
        blogPosts.push(this.toBlogPost(post));
      });
    }

    return blogPosts;
  }

  public async getPost(slug: string): Promise<BlogPage | undefined> {
    const post = await this.notionBlogDatabase.getPost(slug);
    let postContent: Record<string, string>[] = [];

    if (post) {
      const blogPost = this.toBlogPost(post);
      postContent = await this.markdownParser.getPage(post.id);

      return { blogPost, postContent };
    }

    return undefined;
  }

  private toBlogPost(page: PageObjectResponse): BlogPost {
    const id = page.id;
    let slug = '';
    let title = '';
    let tags: Tag[] = [];
    let date = '';
    let description = '';

    if ('properties' in page) {
      if ('title' in page.properties.Name) {
        title = page.properties.Name.title[0].plain_text;
      }

      if ('date' in page.properties.Date) {
        date = page.properties.Date.date?.start as string;
      }

      if ('rich_text' in page.properties.Slug) {
        slug = page.properties.Slug.rich_text[0].plain_text;
      }

      if ('multi_select' in page.properties.Tags) {
        tags = tags.concat(page.properties.Tags.multi_select as unknown as Tag);
      }

      if ('rich_text' in page.properties.Description) {
        description = page.properties.Description.rich_text[0].plain_text;
      }
    }

    return { id, slug, title, tags, date, description };
  }
}
