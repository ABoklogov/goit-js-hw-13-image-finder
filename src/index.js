import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
// import * as basicLightbox from 'basiclightbox'

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

        }
    } catch (err) {
        error({ text: err });
        buttonIsOn();
    }
};

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
    buttonIsOn();
    scrollIntoView();
};

function scrollIntoView() {
    refs.galleryEl.scrollIntoView({
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