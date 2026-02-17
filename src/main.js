import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
  loadMoreBtn,
} from './js/render-functions';

import iconError from './img/icon-error.svg';

const form = document.querySelector('.form');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleImageSearch);

async function handleImageSearch(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const searchQuery = formData.get('search-text').trim();
  if (!searchQuery) return;

  currentQuery = searchQuery;
  currentPage = 1;

  form.reset();
  hideLoadMoreButton();
  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        iconUrl: iconError,
        messageSize: '16',
        maxWidth: 354,
      });
      return;
    }
    createGallery(data.hits);

    const totalLoaded = data.hits.length;
    if (totalLoaded >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        messageSize: '16',
      });
    } else {
      showLoadMoreButton();
      currentPage += 1;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later!',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);
    scrollToNewImages();

    const totalLoaded = document.querySelectorAll('.gallery-item').length;

    if (totalLoaded >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
      currentPage += 1;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function scrollToNewImages() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;
  const { height: cardHeight } = galleryItem.getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
