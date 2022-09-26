import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import { BASE_URL, getPhoto, itemsPerPage } from './api/web';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const loadMore = document.querySelector('.load-more')

let page = 1;
const totalPages = Math.ceil(500 / itemsPerPage);

formEl.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick(searchVal) {
    page += 1;
    const data = await getPhoto(searchVal, page);
    data.hits.forEach(photo => {
            creatCard(photo)
    });
    if (page === totalPages) {
        loadMore.classList.add('visually-hidden')
    }
}

function onSubmit(event) {
    event.preventDefault();
    clearMarkup(galleryEl);
    const searchVal = event.currentTarget[0].value;
    amountData(searchVal)
}

// amountData();
async function amountData(searchVal) {
    try {
        const data = await getPhoto(searchVal, page);
        loadMore.classList.remove('visually-hidden');
        if (data.hits.length === 0) {
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        }
        data.hits.forEach(photo => {
            creatCard(photo)
        });
    } catch (error) {
    console.log(error.message)}
};
const markup = creatCard()
galleryEl.insertAdjacentHTML('afterbegin', markup)
function creatCard({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `<div class="photo-card">
  <a href=${largeImageURL}><img src=${webformatURL} alt=${tags} width='350px' height='300px' style='object-fit: cover;' loading="lazy" /></a>
  <div class="info" style="display: flex; gap: 10px; flex-wrap: wrap; font-size: 12px">
    <p class="info-item">
      <b>Likes: </b><span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views: </b><span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments: </b><span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads: </b><span>${downloads}</span>
    </p>
  </div>
</div>`
};

function clearMarkup(element) {
    element.innerHTML = ''
}

