import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const search = document.getElementById('search-box');

function createMarkup () {
    const markup = 
    `<li><img src='${country.flags.svg}' alt='flag' width='30' class='country-flag'/>
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${allLanguage}</p></li>`;
    console.log(markup);
};

function createMarkupMin() {
    
};

