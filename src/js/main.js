import { retrieveCitiesData } from './api/teleportAPI.js';
import City from './city.js';

const apiData = await retrieveCitiesData();
const citiesNames = apiData.getCitiesNames();
const citiesHrefs = apiData.getCitiesHrefs();
const searchInput = document.querySelector('.input');
const resultsContainer = document.querySelector('.results');
let hintBoxElements; // li elements inside hint box
let citiesList; // ul element inside hint box


// search bar events

searchInput.addEventListener('mouseover', () => setActive());
searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value) {
        setActive();
        autocomplete(e);
    } else {
        setTimeout(removeActive, 5000);
        resultsContainer.setAttribute('hidden', true);
    }
});
document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        removeActive();
    } else {
        setActive();
    }
});


// activating and disactivating search input 

function setActive() {
    if (searchInput.classList.contains('active')) {
        return;
    } else {
        searchInput.classList.add('active');
        searchInput.focus();
    }
}

function removeActive() {
    if (searchInput.classList.contains('active')) {
        searchInput.classList.remove('active');
        searchInput.value = '';
        resultsContainer.setAttribute('hidden', true);
        searchInput.blur();
    }
}


// displaying hints in the results box

function autocomplete(e) {
    let matches = [];
    let suggestions = '';

    if (e.target.value) {
        matches = citiesNames.filter(city => {
            return city.toLowerCase().startsWith(e.target.value.toLowerCase());
        })

        suggestions = matches.map(city => {
            return `<li>${city}</li>`
        }).join('');

        resultsContainer.innerHTML = `<ul>${suggestions}</ul>`;
        hintBoxElements = document.querySelectorAll('li');
        citiesList = resultsContainer.querySelector('ul');

        arrowKeysHandle(e.key, citiesList);


        // hint box events
        hintBoxElements.forEach(element => {
            element.addEventListener('click', select);
        })

        if (suggestions) {
            resultsContainer.removeAttribute('hidden');
        } else {
            resultsContainer.setAttribute('hidden', true);
        }
    }
}


function select(e) {
    searchInput.value = e.target.innerHTML;
    resultsContainer.setAttribute('hidden', true);
}


// handling keyboard events in the results box 

let counter = 0;

function arrowKeysHandle(key, list) {
    if (key === 'ArrowDown') {
        if (counter < list.children.length) {
            list.children[counter].classList.add('selected');
            list.children[counter].scrollIntoView();
            counter++;
        } else {
            list.children[counter-1].classList.add('selected');
            counter = counter - 1;
            return;
        }        
    } else if (key === 'ArrowUp') {
        if (counter > 0) {
            list.children[counter-1].classList.add('selected');
            list.children[counter-1].scrollIntoView();
            counter--;
        } else {
            counter = 0;
            list.children[0].classList.add('selected');
            return;
        }
    } else if (key == "Enter") {
        const selectedChild = list.querySelector('selected').innerHTML;
        console.log(selectedChild);
        selectCity();
    }
}


// retrieving data about a specific city 

function selectCity () {

}

