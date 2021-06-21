import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import * as basicLightbox from 'basiclightbox'

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
            removeCardAndListCountries();
        }
        
        if (e.target.className === 'btn' && refs.inputEl.value === '') {
            info({
            text: "Введите что нибудь в строку!"
            });
        }
        
        if (e.target.className === 'btn' && e.currentTarget.elements.query.value !== '') {
            
            buttonIsOff();
            
            imagesApiService.query = e.currentTarget.elements.query.value.trim();
            
            const fatch = await imagesApiService.fatchImage();
            renderImagesCards(fatch);

            scrollIntoView();

            // openModalWindow(e.target);
        }
    } catch (err) {
        error({ text: err });
        buttonIsOn();
    }
};

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
    buttonIsOn();
};

function scrollIntoView() {
    refs.galleryEl.lastElementChild.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    }); 
};

function buttonIsOff() {
    refs.buttonEl.disabled = true;
};

function buttonIsOn() {
    refs.buttonEl.disabled = false;
};

function removeCardAndListCountries() {
        refs.galleryEl.innerHTML = '';
};

// function openModalWindow(e) {
//     const img = document.querySelector
//     const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)
    
//     imageEl.addEventListener('click', (e) => {
//         // console.log(e);
//         instance.show()
//     })
// }

