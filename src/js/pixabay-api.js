import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54665094-e0be37d71c4f64a84ae76fe5e';

axios.defaults.baseURL = BASE_URL;

export function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data;
    });
}
