const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { searchTerm, imdbID } = event.queryStringParameters;
    const API_KEY = process.env.VITE_OMDB_API_KEY;

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}`;
    if (searchTerm) {
        url += `&s=${searchTerm}`;
    } else if (imdbID) {
        url += `&i=${imdbID}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};