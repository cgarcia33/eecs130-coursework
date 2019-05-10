const serverURL = 'https://api-helpers.herokuapp.com/flickr-proxy-simple/';

const getPhotos = () => {
    fetch(serverURL + '?tags=flowers')
        .then(response => response.json())
        .then(loadCards);
};

const loadCards = (items) => {
    document.querySelector('.cards').innerHTML = '';
    // load new ones (based on photos list)
    for (item of items) {
        const template = `
            <li class="card">
                <div class="image" style="background-image:url('${item.img_url}')"></div>
                <div class="caption">${item.title}</div>
            </li>`;
        document.querySelector('.cards').innerHTML += template;
    }
    initCarousel();
};

const loadCars = () => {
    fetch(serverURL + '?tags=cars')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
};

const loadFlowers = () => {
    fetch(serverURL + '?tags=flowers')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
};

const loadBikes = () => {
    fetch(serverURL + '?tags=bikes')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
}

const loadNature = () => {
    fetch(serverURL + '?tags=nature')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
}

const loadDogs = () => {
    fetch(serverURL + '?tags=dogs')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
}

const loadCats = () => {
    fetch(serverURL + '?tags=cats')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
}

const loadOcean = () => {
    fetch(serverURL + '?tags=ocean')
        .then((response) => {
            return response.json();
        })
        .then(loadCards);
}

getPhotos();
document.querySelector('#cars-button').onclick = loadCars;
document.querySelector('#flowers-button').onclick = loadFlowers;
document.querySelector('#bikes-button').onclick = loadBikes;
document.querySelector('#nature-button').onclick = loadNature;
document.querySelector('#dogs-button').onclick = loadDogs;
document.querySelector('#cats-button').onclick = loadCats;
document.querySelector('#ocean-button').onclick = loadOcean;