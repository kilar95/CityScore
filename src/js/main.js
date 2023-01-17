import { retrieveCitiesData } from './api/teleportAPI.js';
import City from './city.js';
import ShowCity from './showCity.js';

const apiData = await retrieveCitiesData();
const citiesNames = apiData.getCitiesNames();
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

        arrowKeysHandle(e, citiesList);


        // hint box events
        hintBoxElements.forEach(element => {
            element.addEventListener('click', selectChild);
        })

        if (suggestions) {
            resultsContainer.removeAttribute('hidden');
        } else {
            resultsContainer.setAttribute('hidden', true);
        }
    }
}


function selectChild(e) {
    searchInput.value = e.target.innerHTML;
    selectedChild = searchInput.value;
    selectCity(selectedChild);
}


// handling keyboard events in the results box 

let counter = 0;
let selectedChild = '';

function arrowKeysHandle(e, list) {
    if (e.key === 'ArrowDown') {
        if (counter < list.children.length) {
            list.children[counter].classList.add('selected');
            list.children[counter].scrollIntoView();
            selectedChild = list.children[counter].innerHTML;

            counter++;
        } else {
            list.children[counter - 1].classList.add('selected');
            selectedChild = list.children[counter - 1].innerHTML;

            counter = counter - 1;
            return;
        }
    } else if (e.key === 'ArrowUp') {
        if (counter > 0) {
            list.children[counter - 1].classList.add('selected');
            list.children[counter - 1].scrollIntoView();
            selectedChild = list.children[counter - 1].innerHTML;

            counter--;
        } else {
            counter = 0;
            list.children[0].classList.add('selected');
            selectedChild = list.children[0].innerHTML;


            return;
        }
    } else if (e.key == "Enter") {
        selectCity(selectedChild);
    }
}


// retrieving data about a specific city 
const icon = document.querySelector('.icon');
const icon2 = document.querySelector('.icon2');


function selectCity(selectedCity) {
    resultsContainer.setAttribute('hidden', true);
    searchInput.value = '';
    const city = new City(selectedCity);

    city.getCityData()
        .then(() => {
            const showCity = new ShowCity();
            showCity.displayMainTitle(city.name);
            showCity.displayHeaderImg(city.desktopImage);
            showCity.displayDescrTitle(city.nation, city.continent);
            showCity.displaySummary(city.summary);
            icon.style.display = "none";
            icon2.style.display = "none";
            showCity.displayGlobalScore(city.globalScore.toFixed());

            showCity.displayChartTitle();
            
            const colorsNoAlpha = city.categories.map(elem => elem.color);

            //let's apply an alpha value to every color of the bar chart
            let alpha = 0.7;
            let newColors = colorsNoAlpha.map(color => {
                let r = parseInt(color.substring(1, 3), 16);
                let g = parseInt(color.substring(3, 5), 16);
                let b = parseInt(color.substring(5, 7), 16);
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            });

            const labels = city.categories.map(elem => elem.name);
            const scores = city.categories.map(elem => elem.score_out_of_10);
            showCity.displayChart(newColors, labels, scores);
        }
        )
}

