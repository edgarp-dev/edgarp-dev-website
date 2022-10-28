import { Client } from '@notionhq/client';

export default class NotionClient {
  private static client: Client;

  public static getClient(): Client {
    if (!NotionClient.client) {
      NotionClient.client = new Client({
        auth: process.env.NOTION_ACCESS_TOKEN,
      });
    }

    return NotionClient.client;
  }
}
