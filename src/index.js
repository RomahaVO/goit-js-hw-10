import './css/styles.css';
import debounce from 'lodash.debounce';
import countries from './js/fetchCountries';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onInputChange,DEBOUNCE_DELAY));

function onInputChange(e){
e.preventDefault();

    const searchCountry = e.target.value.trim();

        if (searchCountry === "") {
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
            return;
        };

countries.fetchCountries(searchCountry).then(country => {

        if (country.length >= 11){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            // countryList.innerHTML = "";
            return;
        };

        if (country.length >= 2){
            createList(country);
            // countryInfo.innerHTML = "";
            return;
        };

        if (country.length === 1){
            createCard(country[0]);
            // countryList.innerHTML = "";
            return;
        };
        if (country.status === 404){ 
            throw new Error("Not found country")};
    }).catch(onError)
    .finally(countryList.innerHTML = "");
};

function createCard({languages, flags, name, capital, population}){
    const markup = `<h2><img src='${flags.svg}' alt='flag' width='30' class='country-flag'/>${name.common}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>
        `;
    
    countryInfo.innerHTML = markup;
};

function createList(country){
    const list = country.map(name =>
    `<li class='list-elem'>
    <p><img src='${name.flags.svg}' alt='flag' width='30' class='country-flag'/>${name.name.common}<p>
    </li>`).join('');
    countryList.innerHTML = list;
};

function onError(err) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    console.error(err);
};

// function clearRender() {
//     countryList.innerHTML = "";
//     countryInfoCard.innerHTML = "";
// }
