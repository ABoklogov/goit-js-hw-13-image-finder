import ImagesApiService from './js/apiService.js';
import imageCard from './partials/imageCard.hbs';

const refs = {
    formEl: document.querySelector('.search-form'),
    buttonEl: document.querySelector('.btn'),
    galleryEl: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
refs.formEl.addEventListener('click', onImagesButtonClick);

async function onImagesButtonClick(e) {
    try {

        if (e.target.className === 'btn' && e.currentTarget.elements.query.value !== '') {

            imagesApiService.query = e.currentTarget.elements.query.value.trim();
            
            const fatch = await imagesApiService.fatchImage();
            renderImagesCards(fatch)
        }
    } catch (error) {
        console.log(error);
    }
}

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
}
