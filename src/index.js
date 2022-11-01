import { pixabayApiImages } from './pixabayapi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchImagesInput = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');
const photoGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button.load-more');


photoGallery.style.display = 'flex';
photoGallery.style.flexWrap = 'wrap';
photoGallery.style.gap = '40px';
photoGallery.style.flexBasis = 'calc((100% - 30px) / 3)';
photoGallery.style.paddingLeft = '40px';


let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
loadMoreBtn.style.display = 'none';
let pageNumber = 1;
const  perPage = 40;

function clearGallery() {
    photoGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    pageNumber = 1;
}
            
searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    clearGallery();
    const inputTextTrim = searchImagesInput.value.trim();
    async function gal() {      
            let galleryPhoto = await pixabayApiImages(inputTextTrim, pageNumber);
            if (galleryPhoto.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
            renderPhotoGallery(galleryPhoto.hits);
            Notiflix.Notify.success(`Hooray! We found ${galleryPhoto.totalHits} images.`);
            loadMoreBtn.style.display = 'block';
            gallerySimpleLightbox.refresh();           
        }
    }        
    if (inputTextTrim !== '') {
        gal();
    } 

};            

loadMoreBtn.addEventListener('click', () => {
  const inputTextTrim = searchImagesInput.value.trim();
    loadMoreBtn.style.display = 'none';
     pageNumber += 1;
    async function gal() {      
            let galleryPhoto = await pixabayApiImages(inputTextTrim, pageNumber);
        if (pageNumber - 1 > Math.floor(galleryPhoto.totalHits / perPage)) {           
            Notiflix.Notify.failure('Sorry, there are no more images.');
            loadMoreBtn.style.display = 'hide';
            console.log(galleryPhoto.totalHits);
            return;
        }
            else {
                    renderPhotoGallery(galleryPhoto.hits);
                    loadMoreBtn.style.display = 'block';
                    console.log(galleryPhoto.hits);
                    console.log(pageNumber);
            }              
             }
    gal();
                            });

function renderPhotoGallery(photos) { 
    // console.log('photo', photos);
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
  
  // photoGallery.innerHTML += markup;
    photoGallery.insertAdjacentHTML("beforeend", markup);
    

}