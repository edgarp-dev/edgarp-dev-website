import { Client } from '@notionhq/client';
import { BlogPost, Tag } from '../../@types/schema';

export default class NotionApi {
  private readonly notionClient: Client;

  private readonly notionDatabaseId: string;

  constructor() {
    this.notionClient = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.notionDatabaseId = process.env.NOTION_BLOG_DATABASE_ID || '';
  }

  async getListOfPosts(): Promise<BlogPost[]> {
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

    response.results.forEach((result) => {
      const id = result.id;
      let slug = '';
      let title = '';
      let tags: Tag[] = [];
      let date = '';

      if ('properties' in result) {
        if ('title' in result.properties.Name) {
          title = result.properties.Name.title[0].plain_text;
        }

        if ('date' in result.properties.Date) {
          date = result.properties.Date.date?.start as string;
        }

        if ('rich_text' in result.properties.Slug) {
          slug = result.properties.Slug.rich_text[0].plain_text;
        }

        if ('multi_select' in result.properties.Tags) {
          tags = tags.concat(
            result.properties.Tags.multi_select as unknown as Tag,
          );
        }
      }

      listOfPosts.push({ id, slug, title, tags, date });
    });

    return listOfPosts;
  }
}
