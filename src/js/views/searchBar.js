import citiesNames from "../api/teleportAPI.js";

// const searchBar = document.querySelector('.search-bar');
const searchInput = document.querySelector('.input');
const resultsContainer = document.querySelector('.results');
const searchIcon = document.querySelector('i');



searchInput.addEventListener('mouseover', () => setActive());

searchInput.addEventListener('keyup', (e) => {
    if (e.target.value) {
        setActive();
        autocomplete(e);
    } else {
        removeActive();
        resultsContainer.classList.add('hidden');
    }
})

document.addEventListener('click', (e) => {
    if (e.target.contains(searchInput) || e.target.contains(searchIcon)) {
        setActive();
        searchInput.focus();
        setTimeout(clear, 4000);
    } else {
        removeActive();
    }
});


searchInput.addEventListener('mouseleave', () => {
    if (searchInput.value == '') {
        setTimeout(clear, 4000);
        searchInput.blur();
    }
})


function setActive() {
    if (searchInput.classList.contains('active')) {
        return;
    } else {
        searchInput.classList.add('active');
    }
}

function removeActive() {
    if (searchInput.classList.contains('active')) {
        searchInput.classList.remove('active');
    }
}


function clear() {
    if (!searchInput.value) {
        searchInput.classList.remove('active');
    } else {
        return;
    }
}

function autocomplete(e) {
    let matches = [];
    let suggestions = '';

    if (e.target.value) {
        matches = citiesNames.filter(city => {
            return city.toLowerCase().startsWith(e.target.value.toLowerCase());
        })

        matches.forEach(city => {
            suggestions += `<li onclick="select(event)">${city}</li>`
        })

        resultsContainer.innerHTML = `<ul>${suggestions}</ul>`;

        if (resultsContainer.innerHTML) {
            resultsContainer.classList.remove('hidden');
        }
    }

    // suggestions = matches.map(data => {
    //     return data = '<li>' + data + '</li>'; 
    // })

    // showSuggestions(suggestions);
    // let completeList = resultsContainer.querySelectorAll('li');
    // completeList.forEach(item => {
    //     item.setAttribute('onlick', 'select(event)');
    // })
    //  if (e.target.value == '') {
    //     searchInput.classList.remove('active');
    //     resultsContainer.classList.add('hidden');

}


function select(e) {
    resultsContainer.innerHTML = '';
    searchInput.value = e.target.innerHTML;

    resultsContainer.classList.add = 'hidden';
}