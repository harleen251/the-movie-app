import axios from 'axios';

export const API_KEY='0b352e317a9aa53a0200acb11a697fc1'
export const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMoviesByCategory = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};



export const searchContent = async (searchCategory, query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/${searchCategory}?api_key=${API_KEY}&query=${query}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching search content:', error);
        return [];
    }
};