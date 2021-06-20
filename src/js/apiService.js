const API_KEY = '22144472-c4d53a495baf7d3490978ff95';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fatchImage() {
       
       const response = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
       const image = await response.json();
       const data = await image.hits;
   
       this.incrementPage();
       return data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}