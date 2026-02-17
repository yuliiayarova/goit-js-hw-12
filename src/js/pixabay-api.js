import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54665094-e0be37d71c4f64a84ae76fe5e';

axios.defaults.baseURL = BASE_URL;

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
