import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

import ImagesApiService from './js/apiService.js';
import imageCard from './partials/imageCard.hbs';

const refs = {
    formEl: document.querySelector('.search-form'),
    inputEl: document.querySelector('[name="query"]'),
    buttonEl: document.querySelector('.btn'),
    galleryEl: document.querySelector('.gallery'),
};


const imagesApiService = new ImagesApiService();

refs.formEl.addEventListener('click', onImagesButtonClick);

async function onImagesButtonClick(e) {
    try {
        if (refs.inputEl.value !== imagesApiService.searchQuery) {
            imagesApiService.resetPage();
        }
        
        // console.log(refs.inputEl.value === '');
        
        if (e.target.className === 'btn' && e.currentTarget.elements.query.value !== '') {
            
            // if (refs.inputEl.value === '') {
            //     console.log(123);
            //     info({
            //     text: "Введите что нибудь в строку"
            //     });
            // }
            
            refs.buttonEl.disabled = true;
            
            refs.galleryEl.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            });

            imagesApiService.query = e.currentTarget.elements.query.value.trim();

            const fatch = await imagesApiService.fatchImage();
            renderImagesCards(fatch);

        }
    } catch (err) {
        error({ text: err });
        refs.buttonEl.disabled = false;
    }
}

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
    refs.buttonEl.disabled = false;
}
