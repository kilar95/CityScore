// importing css files 
import '../css/index.css';
import '../css/navbar.css';
import '../css/header.css';
import '../css/searchBar.css';
import '../css/divider.css';
import '../css/compareSearchBar.css';
import '../css/footer.css';
import '../css/desktop.css';

// importing images and setting src
import greenCity from '../assets/icons/green-city.png';
import bar from '../assets/icons/horizontal-bar-2.png';

const icon = document.querySelector('.icon');
const icon2 = document.querySelector('.icon2');
icon.src = greenCity;
icon2.src = bar;


import { retrieveCitiesData } from './api/teleportAPI.js';
import City from './city.js';
import ShowCity from './showCity.js';

const apiData = await retrieveCitiesData();
const citiesNames = apiData.getCitiesNames();
const showCity = new ShowCity(); // city displayed on the page

const searchInput = document.querySelector('.input');
const searchIcon = document.querySelector('.fa-magnifying-glass');
const resultsContainer = document.querySelector('.results');
let hintBoxElements; // li elements inside main hint box
let citiesList; // ul element inside main hint box
let compareResults; // compare section hint box
let compareCitySearchInput; // compare section input
let removeIcon;

// search bar events

searchInput.addEventListener('mouseover', () => setActive());
searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value) {
        setActive();
        autocomplete(e);
    } else {
        setTimeout(removeActive, 5000);
        resultsContainer.hidden = true;
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
        searchIcon.style.visibility = 'hidden';
        searchInput.focus();
    }
}

function removeActive() {
    if (searchInput.classList.contains('active')) {
        searchInput.classList.remove('active');
        searchInput.value = '';
        searchInput.blur();
        searchIcon.style.visibility = 'visible';
        resultsContainer.hidden = true;
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

        if (e.target == searchInput) {
            resultsContainer.innerHTML = `<ul>${suggestions}</ul>`;
            suggestions ? resultsContainer.hidden = false : resultsContainer.hidden = true;
            hintBoxElements = resultsContainer.querySelectorAll('li');
            citiesList = resultsContainer.querySelector('ul');
        } else {
            compareResults = document.querySelector('.compare-hints');
            compareResults.innerHTML = `<ul>${suggestions}</ul>`;
            suggestions ? compareResults.hidden = false : compareResults.hidden = true;
            hintBoxElements = compareResults.querySelectorAll('li');
            citiesList = compareResults.querySelector('ul');
        }


        arrowKeysHandle(e, citiesList);


        // hint box events
        hintBoxElements.forEach(element => {
            element.addEventListener('click', selectChild);
        })

    }
}


function selectChild(e) {
    if (resultsContainer.contains(e.target)) {
        selectCity(e.target.innerHTML);
    } else {
        compareCityHandle(e.target.innerHTML);
    }
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
        }
    } else if (e.key === "Enter") {

        switch (e.target) {
            case searchInput:
                if (selectedChild) {
                    selectCity(selectedChild);
                } else {
                    selectedChild = searchInput.value;
                    selectCity(selectedChild);
                }
                break;
            case compareCitySearchInput:
                if (selectedChild) {
                    compareCityHandle(selectedChild);
                } else {
                    selectedChild = compareCitySearchInput.value;
                    compareCityHandle(selectedChild)
                }
                break;
            default:
                return;
        }
    }
}


// retrieving data about a specific city 

function selectCity(selectedCity) {
    try {
        selectedChild = '';
        const city = new City(selectedCity);

        city.getCityData()
            .then(() => {
                resultsContainer.hidden = true;
                showCity.displayMainTitle(city.name);
                showCity.displayHeaderImg(city.image);
                showCity.displayDescrTitle(city.nation, city.continent);
                showCity.displaySummary(city.summary);
                icon.style.display = "none";
                icon2.style.display = "none";
                showCity.displayGlobalScore(city.globalScore.toFixed());

                //let's apply an alpha value to every color of the bar chart
                const colorsNoAlpha = city.categories.map(elem => elem.color);

                let alpha = 0.6;
                let newColors = colorsNoAlpha.map(color => {
                    let r = parseInt(color.substring(1, 3), 16);
                    let g = parseInt(color.substring(3, 5), 16);
                    let b = parseInt(color.substring(5, 7), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                });

                const labels = city.categories.map(elem => elem.name);
                const scores = city.categories.map(elem => elem.score_out_of_10);
                showCity.displayChart(newColors, colorsNoAlpha, labels, scores);
                showCity.displayCompareSearchBar();

                // adding event listeners to compare search bar 
                compareCitySearchInput = document.querySelector('.compare-input');
                compareResults = document.querySelector('.compare-hints');
                removeIcon = document.querySelector('.remove-icon');


                compareCitySearchInput.addEventListener('keyup', (e) => {
                    if (e.target.value) {
                        autocomplete(e);
                    } else {
                        compareResults.hidden = true;
                    }
                });
                document.addEventListener('click', (e) => {
                    if (e.target !== compareCitySearchInput &&
                        !compareCitySearchInput.contains(e.target) &&
                        !compareResults.contains(e.target)) {
                        compareResults.hidden = true;
                    }
                })

            })
    } catch (err) {
        searchInput.setCustomValidity('City name not valid');
        searchInput.reportValidity();

        setTimeout(() => searchInput.blur(), 1500);
    }

    searchInput.value = '';

}

function compareCityHandle(selectedCity) {

    try {
        selectedChild = '';
        const newCity = new City(selectedCity);

        newCity.getCityData()
            .then(() => {
                compareResults.hidden = true;
                const newScores = newCity.categories.map(elem => elem.score_out_of_10);

                showCity.addCityToChart(newCity.name, newScores, newCity.globalScore.toFixed());
                compareCitySearchInput.value = newCity.name;
                compareCitySearchInput.setAttribute('readonly', true);
                compareCitySearchInput.style.backgroundColor = '#7a7a7a';
                compareCitySearchInput.style.color = 'white';

                removeIcon.addEventListener('click', removeCity);
            });
    } catch (err) {
        compareCitySearchInput.setCustomValidity('City name not valid');
        compareCitySearchInput.reportValidity();

        setTimeout(() => compareCitySearchInput.blur(), 1500);
    }

}

function removeCity() {
    showCity.removeCityfromChart();
    compareCitySearchInput.value = '';
    compareCitySearchInput.removeAttribute('readonly');
    compareCitySearchInput.style.backgroundColor = '#fff';
    compareCitySearchInput.style.color = '#34495e';
}

