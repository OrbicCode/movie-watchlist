exports.handler = async (event) => {
    console.log('Event:', event);
    console.log('Environment Variable:', process.env.VITE_OMDB_API_KEY);

    const { searchTerm, imdbID } = event.queryStringParameters;
    const API_KEY = process.env.VITE_OMDB_API_KEY;

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}`;
    if (searchTerm) {
        url += `&s=${searchTerm}`;
    } else if (imdbID) {
        url += `&i=${imdbID}`;
    }

    try {
        console.log('Fetching URL:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Response Data:', data);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};