import axios from 'axios';

export const lambdaHandler = async (event, context) => {
    try {
        console.log('>>>> REVALIDATING');

        const revalidateUrl = `https://www.edgarp.dev/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`;
        console.log(revalidateUrl);
        const response = await axios.get(revalidateUrl);
        console.log(response.data);

        console.log('>>>> FINISHED REVALIDATING');
    } catch (err) {
        console.log(err.message);
        return err;
    }
};
