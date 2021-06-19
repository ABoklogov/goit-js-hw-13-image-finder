import ImagesApiService from './js/apiService.js';
import imageCard from './partials/imageCard.hbs';

const refs = {
    formEl: document.querySelector('.search-form'),
    buttonEl: document.querySelector('.btn'),
    galleryEl: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
refs.buttonEl.addEventListener('click', onImagesButtonClick);

async function onImagesButtonClick(e) {
    try {
        await imagesApiService.fatchImage()
        .then(renderImagesCards);
        
    } catch (error) {
        console.log(error);
    }
}

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
}
