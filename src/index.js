import { pixabayApiImages } from './pixabayapi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchImagesInput = document.querySelector('input[name="searchQuery"]');
const searchBtn = document.querySelector('button[type="submit"');
const photoGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button.load-more');

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
loadMoreBtn.style.display = 'none';
let pageNumber = 1;

function clearGallery() {
    photoGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    pageNumber = 1;
}

searchBtn.addEventListener('click', event => {
  event.preventDefault();
  clearGallery();
  const inputTextTrim = searchImagesInput.value.trim();
  if (inputTextTrim !== '') {
    pixabayApiImages(inputTextTrim, pageNumber).then(galleryPhoto => {
      if (galleryPhoto.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        renderPhotoGallery(galleryPhoto.hits);
        Notiflix.Notify.success(`Hooray! We found ${galleryPhoto.totalHits} images.`);      
        loadMoreBtn.style.display = 'block';
        gallerySimpleLightbox.refresh();
       
    }});
                            }
});

loadMoreBtn.addEventListener('click', () => {
  const inputTextTrim = searchImagesInput.value.trim();
  loadMoreBtn.style.display = 'none';
  pixabayApiImages(inputTextTrim, pageNumber).then(galleryPhoto => {
    if (galleryPhoto.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      renderPhotoGallery(galleryPhoto.hits);
      Notiflix.Notify.success(`Hooray! We found ${galleryPhoto.totalHits} images.`);
      loadMoreBtn.style.display = 'block';
      pageNumber += 1;
    }
  });
});

function renderPhotoGallery(photos) { 
    console.log('photo', photos);
  const markup = photos.map(photo => {     
      return `<div class="photo-card">
                    <a href="${photo.largeImageURL}"><img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/></a>
                    <div class="info">
                        <p class="info-item">
                            <b> Likes: ${photo.likes}</b>
                        </p>
                        <p class="info-item">
                            <b> Views: ${photo.views}</b> 
                        </p>
                        <p class="info-item">
                            <b> Comments: ${photo.comments}</b> 
                        </p>
                        <p class="info-item">
                            <b> Downloads: ${photo.downloads}</b>
                        </p>
                    </div>
            </div>`;
    })
    .join('');
    photoGallery.innerHTML += markup;
    

}