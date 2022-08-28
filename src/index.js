import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;

const searchBox = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function clearMarkup(){
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
};


function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
};

function onSearchBoxInput(e) {    
    let name = e.target.value.trim();
    if (name) {
        const obj = fetchCountries(name).then(renderMarkup).catch(onError);        
    } else {
        clearMarkup();
    };
};

function renderMarkup(data) {
    clearMarkup();
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    };
    if (data.length >= 2) {
        const markup = data.map(({ name, flags }) => {
           
              return `<div>
                <img src='${flags.svg}' alt='Flag' width='50'>
                <h1>${name}</h1>                
            </div>`
            
        }).join('');
      countryListEl.innerHTML = markup;
    };
    if (data.length === 1) {
        data.forEach(({ name, capital, population, flags, languages }) => {
            const language = Object.values(languages[0].name).join('');
            const markup =
                `<div>
                <img src='${flags.svg}' alt='Flag' width='150'>
                <h1>${name}</h1>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${language}</p>
            </div>`
            countryInfoEl.innerHTML = markup;
        });
    };
};


