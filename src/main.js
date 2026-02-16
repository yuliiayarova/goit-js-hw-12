import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iconError from './img/icon-error.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', handleImageSearch);

function handleImageSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const searchQuery = formData.get('search-text').trim();
  if (!searchQuery) {
    return;
  }

  form.reset();
  showLoader();
  clearGallery();

  getImagesByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: '#fafafb',
          iconUrl: iconError,
          messageSize: '16',
          maxWidth: 432,
          pauseOnHover: true,
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later!',
        position: 'topRight',
        timeout: 5000,
      });
    })
    .finally(() => {
      hideLoader();
    });
}
