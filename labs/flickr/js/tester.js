let results;
const serverURL = 'https://api-helpers.herokuapp.com/flickr-proxy-simple/';

const getPhotos = () => {
    // this function pulls down data from a server
    // everytime it is invoked. Change the value of
    // the tag to get different data:
    fetch(serverURL + '?tags=skyline')
        .then(response => response.json())
        .then(doSomethingWithTheData);
};

const doSomethingWithTheData = (response) => {
    // this function executes once the data has been 
    // pulled down from the server:
    results = response;
    for (item of results) {
        let template = `<img src="${item.img_url}" alt="${item.title}">`;
        document.querySelector('#gallery').innerHTML += template;
    }
    console.log('The Flickr data is stored in a variable called "results":', results);
};

// invoke the function when the page initializes:
getPhotos();