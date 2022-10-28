import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import NotionClient from './NotionClient';

export default class NotionDatabase {
  private readonly notionClient: Client;

  private readonly notionDatabaseId: string;

  constructor() {
    this.notionClient = NotionClient.getClient();
    this.notionDatabaseId = process.env.NOTION_BLOG_DATABASE_ID || '';
  }

  public async getPosts(): Promise<PageObjectResponse[] | undefined> {
    try {
      const response = await this.notionClient.databases.query({
        database_id: this.notionDatabaseId,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'Date',
            direction: 'ascending',
          },
        ],
      });

      return response.results as PageObjectResponse[];
    } catch (err) {
      console.error(err);

      return undefined;
    }
  }

  public async getPost(slug: string): Promise<PageObjectResponse | undefined> {
    try {
      const response = await this.notionClient.databases.query({
        database_id: this.notionDatabaseId,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
      });

      return response.results[0] as PageObjectResponse;
    } catch (err) {
      console.error(err);

      return undefined;
    }
  }
}
