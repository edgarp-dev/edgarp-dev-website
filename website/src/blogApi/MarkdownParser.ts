import NotionClient from './NotionClient';
import { NotionToMarkdown } from 'notion-to-md';
import { MdBlock } from 'notion-to-md/build/types';

export default class MarkdownParser {
  private readonly notionToMarkdownClient: NotionToMarkdown;

  constructor() {
    this.notionToMarkdownClient = new NotionToMarkdown({
      notionClient: NotionClient.getClient(),
    });
  }

  public async getPage(postId: string): Promise<Record<string, string>[]> {
    const markdownBlocks = await this.notionToMarkdownClient.pageToMarkdown(
      postId,
    );

    const postContent: Record<string, string>[] = [];
    markdownBlocks.forEach((markdownBlock) => {
      postContent.push(this.parseMarkdown(markdownBlock));
    });

    return postContent;
  }

  private parseMarkdown(markdownBloc: MdBlock): Record<string, string> {
    switch (markdownBloc.type) {
      case 'heading_1':
        return {
          type: 'h1',
          content: markdownBloc.parent.replace('#', ''),
        };
      case 'heading_2':
        return {
          type: 'h2',
          content: markdownBloc.parent.replace('##', ''),
        };
      case 'heading_3':
        return {
          type: 'h3',
          content: markdownBloc.parent.replace('###', ''),
        };
      case 'paragraph': {
        const isBreakLine = !markdownBloc.parent;
        const isUrlLink = markdownBloc.parent.includes('http');
        return {
          type: isBreakLine ? 'br' : isUrlLink ? 'a' : 'p',
          content: isBreakLine
            ? ''
            : isUrlLink
            ? (markdownBloc.parent.match(/\(([^()]*)\)/) as string[])[1]
            : markdownBloc.parent,
        };
      }
      case 'bulleted_list_item':
        return {
          type: 'li',
          content: markdownBloc.parent.replace('-', ''),
        };
      case 'code':
        return {
          type: 'code',
          content: markdownBloc.parent,
        };
      case 'image':
        return {
          type: 'image',
          content: markdownBloc.parent,
        };
      default:
        return {
          type: 'n/a',
          content: 'n/a',
        };
    }
  }
}
