import { notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
const basicLightbox = require('basiclightbox');

import ImagesApiService from './js/apiService.js';
import imageCard from './partials/imageCard.hbs';
// import observer from './js/intObserver.js';


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
            
            let fatch = await imagesApiService.fatchImage();
            renderImagesCards(fatch);

            // setTimeout(() => {
            // scrollIntoView();
            // }, 1000);
            
        }
    } catch (err) {
        error({ text: err });
        buttonIsOn();
    }
};

openModalWindow(refs.galleryEl);

function renderImagesCards(image) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageCard(image));
    buttonIsOn();
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

function removeCardAndListCountries() {
    refs.galleryEl.innerHTML = '';
};

function openModalWindow() {
    
    refs.galleryEl.addEventListener('click', (e) => {
        const instance = basicLightbox.create(`
        <img src=${e.path[1].children[2].currentSrc} >
    `)
        instance.show();
    })
}
// --------------------------Бесконечный скрол-------------

const  callback =  entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imagesApiService.query !== '') {
           imagesApiService.fatchImage().then((data) => renderImagesCards(data))
        }
    })
};

const options = {
  rootMargin: '300px',
}

export const observer = new IntersectionObserver(callback, options);

const sentinelEl = document.querySelector('#sentinel');
observer.observe(sentinelEl);