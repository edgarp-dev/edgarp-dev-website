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
            return `/blog/post/${blogDatabaseItem.properties.Slug.rich_text[0].plain_text}`;
        });

        const revalidationPromises = blogPostsUrlPaths.map(urlPath => {
            const revalidateUrl = `https://www.edgarp.dev/api/revalidate?path=${urlPath}&secret=${process.env.REVALIDATE_TOKEN}`;
            return axios.get(revalidateUrl);
        });

        await Promise.all(revalidationPromises);

        console.log('>>>> FINISHED REVALIDATING');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'revalidated'
            })
        };
    } catch (err) {
        console.error(err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            })
        };
    }
};
