import axios from 'axios';
import { Client } from '@notionhq/client';

const notionClient = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN
});

export const lambdaHandler = async (event, context) => {
    try {
        console.log('>>>> REVALIDATING');

        const blogsDatabaseResponse = await notionClient.databases.query({
            database_id: process.env.NOTION_BLOG_DATABASE_ID || '',
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

        const blogPostsUrlPaths = blogsDatabaseResponse.results.map(blogDatabaseItem => {
            return blogDatabaseItem.properties.Slug.rich_text[0].plain_text;
        });

        console.log(blogPostsUrlPaths)
        // const revalidateUrl = `https://www.edgarp.dev/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`;
        // console.log(revalidateUrl);
        // const response = await axios.get(revalidateUrl);
        // console.log(response.data);

        console.log('>>>> FINISHED REVALIDATING');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'revalidated'
            })
        };
    } catch (err) {
        console.errorcd(err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            })
        };
    }
};
