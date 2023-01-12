let citiesList;
let citiesNames = []; 

// const searchBar = document.querySelector('.search-bar');
// const searchInput = document.querySelector('.input');
// const resultsContainer = document.querySelector('.results');
// const itemLink = resultsContainer.querySelector('a');

// let's fetch the data from the API 

fetch('https://api.teleport.org/api/urban_areas/')
.then(response => {
    const data = response.json();
    return data;
}).then(data => {
    citiesList = data._links[`ua:item`];
    citiesList.forEach(objectItem => {
        citiesNames.push(objectItem.name);
    })
    console.log(citiesNames);
}).catch(err => console.log(err));


export default citiesNames;
