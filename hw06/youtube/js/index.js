const search = (ev) => {
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/youtube/simple/?q=${term}+&type=video`;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    let term = document.querySelector('input').value;
    document.querySelector('#output').innerHTML = "";
    document.querySelector('#output').innerHTML += `<h1 class="vid-title">YouTube videos about ${term}</h1>`
    for (vid of data) {
        let id = getVidID(vid.url);
        let vid_template = `<iframe id="ytplayer" type="text/html" width="640" height="360"
        src="https://www.youtube.com/embed/${id}?autoplay=0"
        frameborder="0"></iframe>`;
        document.querySelector('#output').innerHTML += vid_template;
    }
};

const getVidID = url => {
    return url.split('v=')[1];
}
    
document.querySelector('#search').onclick = search;