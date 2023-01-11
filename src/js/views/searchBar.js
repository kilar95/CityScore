searchBar = document.querySelector('.input');


searchBar.addEventListener('keyup', (e) => {
    if (e.target.value) {
        searchBar.classList.add('active');
    } else {
        searchBar.classList.remove('active');
    }
})


document.addEventListener('click', (e) => {
    if (e.target == searchBar) {
        searchBar.classList.add('active');
        setTimeout(clear, 4000);
    } else {
        searchBar.classList.remove('active');
    }
})


searchBar.addEventListener('mouseOut', () => {
    if (searchBar.classList.contains('active')) {
        return;
    }
    // searchBar.value = '';
    searchBar.blur();
})


function clear() {
    console.log('clearing');
    if (!searchBar.value) {
        searchBar.classList.remove('active');
    } else {
        return;
    }
}