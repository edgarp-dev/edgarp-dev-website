import axios from 'axios';

export const lambdaHandler = async (event, context) => {
    try {
        // console.log('>>>> REVALIDATING');

        // const revalidateUrl = `https://www.edgarp.dev/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`;
        // console.log(revalidateUrl);
        // const response = await axios.get(revalidateUrl);
        // console.log(response.data);

        // console.log('>>>> FINISHED REVALIDATING');
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'revalidated'
            })
        };
    } catch (err) {
        console.log(err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            })
        };
    }
};
