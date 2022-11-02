import { pixabayApiImages } from './pixabayapi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


Notiflix.Notify.init({
    width: '480px',
})

const body = document.querySelector('body');
const searchImagesInput = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');
const photoGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button.load-more');



    body.style.backgroundColor = 'E5E5E5';
    searchForm.style.display = 'flex';
    searchForm.style.justifyContent = 'center';
    searchForm.style.fontSize = '30px';
    searchForm.style.marginBottom = '20px';
    searchForm.style.backgroundColor = 'blue';
    searchForm.style.paddingTop = '30px';
    searchForm.style.paddingBottom = '30px';
    searchImagesInput.style.padding = '20px';
    searchImagesInput.style.width = '400px';


    photoGallery.style.display = 'flex';
    photoGallery.style.flexWrap = 'wrap';
    photoGallery.style.gap = '40px';
    photoGallery.style.flexBasis = 'calc((100% - 30px)/3)';
    photoGallery.style.padding = '30px';
    photoGallery.style.marginTop = '20px';
    photoGallery.style.marginLeft = 'auto';
    photoGallery.style.marginRight = 'auto';
    // photoGallery.style.borderRadius = '10px';



let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
loadMoreBtn.style.display = 'none';
loadMoreBtn.style.fontSize = '40px';
loadMoreBtn.style.padding = '20px';
loadMoreBtn.style.marginTop = '20px';
loadMoreBtn.style.marginBottom = '20px';
loadMoreBtn.style.marginLeft = 'auto';
loadMoreBtn.style.marginRight = 'auto';
loadMoreBtn.style.borderRadius = '10px';
loadMoreBtn.style.backgroundColor = 'blue';
loadMoreBtn.style.color = 'white';


let pageNumber = 1;
const  perPage = 40;

function clearGallery() {
    photoGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    pageNumber = 1;
}

Notiflix.Notify.init({
  width: '480px',
  position: 'right-top',
    distance: '10px',
    opacity: 1,
fontSize: '33px',
  // ...
});

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
                // galleryStyle();
            renderPhotoGallery(galleryPhoto.hits);
            Notiflix.Notify.success(`Hooray! We found ${galleryPhoto.totalHits} images.`);
                loadMoreBtn.style.display = 'flex';
                 loadMoreBtn.style.justifyContent = 'center';
                
            gallerySimpleLightbox.refresh();           
        }
    }        
    if (inputTextTrim !== '') {
        gal();
       

    } 

};  

loadMoreBtn.addEventListener('click', () => {
  const inputTextTrim = searchImagesInput.value.trim();
  
     pageNumber += 1;
    async function gal() {      
        let galleryPhoto = await pixabayApiImages(inputTextTrim, pageNumber);
  
        if (pageNumber - 1 > Math.floor(galleryPhoto.totalHits / perPage)) {           
            Notiflix.Notify.failure('Sorry, there are no more images.');
            loadMoreBtn.style.display = 'none';
            console.log(galleryPhoto.totalHits);
            return;
        }
            else {
            renderPhotoGallery(galleryPhoto.hits);
            // loadMoreBtn.style.marginTop = '100px';
            // loadMoreBtn.style.marginBottom = '100px';
                // loadMoreBtn.style.display = 'block';
                // loadMoreBtn.style.display = 'flex';
                // loadMoreBtn.style.justifyContent = 'center';
        
                    console.log(galleryPhoto.hits);
                    console.log(pageNumber);
            }              
             }
    gal();
                            });

function renderPhotoGallery(photos) { 
    // console.log('photo', photos);
  const markup = photos.map(photo => {     
      return `  <style> .photo-card {
                // box-sizing: border-box;
                border-radius: 14px;
                box-shadow: 10px 10px 8px 2px rgba(0, 0, 0, 0.3);
                border = "             

                    } </style>
      <div class="photo-card">
      <style> .photo {
                 object-fit:contain;               

                    }  </style>

                    <a class= "photo" href="${photo.largeImageURL}"><img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy", width = "640", height = "370"/></a>
                    <style> .info {
                            display: flex;
                            // flex-direction = column;
                          justify-content: space-evenly;                          
                        //   align-items: center;

                          font-size: 25px;
                        //   margin-left: 20px;
                        //    margin-right: 20px;
                           list-style-type: none;
                    }
                   </style>
                   <p> 
                    <div class="info">
                    <li>  <b> Likes </b>
                            <p><n>${photo.likes}</n>
                    </li>   
                    <li>  <b> Views </b>
                            <p><n>${photo.views}</n><p>
                    </li>  
                     <li>  <b> Comments </b>
                            <p><n>${photo.comments}</n><p>
                    </li>  
                    <li>  <b> Downloads </b>
                            <p><n>${photo.downloads}</n><p>
                    </li>                 
                    </div>
                                                
            </div>`;
    
    })
    .join('');
  
  // photoGallery.innerHTML += markup;
    photoGallery.insertAdjacentHTML("beforeend", markup);
    

}






// info.style.display = 'flex';

// loadMoreBtn.style.display = 'flex';
// loadMoreBtn.style.justifyContent = 'center';