import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { BlogPost, PostPage, Tag } from '../../@types/schema';

export default class NotionApi {
  private readonly notionClient: Client;

  private readonly notionDatabaseId: string;

  private readonly notionToMarkdownClient: NotionToMarkdown;

  constructor() {
    this.notionClient = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.notionDatabaseId = process.env.NOTION_BLOG_DATABASE_ID || '';
    this.notionToMarkdownClient = new NotionToMarkdown({
      notionClient: this.notionClient,
    });
  }

  public async getListOfPosts(): Promise<BlogPost[]> {
    const response = await this.notionClient.databases.query({
      database_id: this.notionDatabaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
    });

    const listOfPosts: BlogPost[] = [];

    response.results.forEach((page) => {
      const blogPost = this.pageToPostTransformer(page);
      listOfPosts.push(blogPost);
    });

    return listOfPosts;
  }

  public async getPost(slug: string): Promise<PostPage> {
    const response = await this.notionClient.databases.query({
      database_id: this.notionDatabaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    const page = response.results[0];
    const markdownBlocks = await this.notionToMarkdownClient.pageToMarkdown(
      page.id,
    );

    const postElements: Record<string, string>[] = [];
    markdownBlocks.forEach((markdownBloc) => {
      switch (markdownBloc.type) {
        case 'heading_1':
          postElements.push({
            type: 'h1',
            content: markdownBloc.parent.replace('#', ''),
          });
          break;
        case 'heading_2':
          postElements.push({
            type: 'h2',
            content: markdownBloc.parent.replace('##', ''),
          });
          break;
        case 'heading_3':
          postElements.push({
            type: 'h3',
            content: markdownBloc.parent.replace('###', ''),
          });
          break;
        case 'paragraph':
          {
            const isBreakLine = !markdownBloc.parent;
            const isUrlLink = markdownBloc.parent.includes('http');
            postElements.push({
              type: isBreakLine ? 'br' : isUrlLink ? 'a' : 'p',
              content: isBreakLine
                ? ''
                : isUrlLink
                ? (markdownBloc.parent.match(/\(([^()]*)\)/) as string[])[1]
                : markdownBloc.parent,
            });
          }
          break;
        case 'bulleted_list_item':
          postElements.push({
            type: 'li',
            content: markdownBloc.parent.replace('-', ''),
          });
          break;
        case 'code':
          postElements.push({
            type: 'code',
            content: markdownBloc.parent,
          });
          break;
        case 'image':
          postElements.push({
            type: 'image',
            content: markdownBloc.parent,
          });
          break;
      }
    });

    const post = this.pageToPostTransformer(page);

    return { post, postElements };
  }

  private pageToPostTransformer(
    page: PageObjectResponse | PartialPageObjectResponse,
  ): BlogPost {
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
