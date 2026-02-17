import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.btn-load');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images = []) {
  const markup = images
    .map(image => {
      return `<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      data-source="${image.largeImageURL}"
      alt="${image.tags}"
    />
  </a>
  <div class="gallery-info">
  <p class="info-descr"><b>Likes:</b> ${image.likes}</p>
  <p class="info-descr"><b>Views:</b> ${image.views}</p>
  <p class="info-descr"><b>Comments:</b> ${image.comments}</p>
  <p class="info-descr"><b>Downloads:</b> ${image.downloads}</p>
</div>
</li>
`;
    })
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
