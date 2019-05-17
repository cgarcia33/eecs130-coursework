let tracks = [];
let currentTrack = null;
let currentTrackIdx = 0;

const search = (ev) => {
    tracks = [];
    currentTrack = null;
    currentTrackIdx = 0;
    console.log(document.querySelector('input').value);
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/spotify/simple/v1/search?q=${term}&type=track`;
    fetch(url)
        .then(response => response.json())
        .then(displayResults);
};

const displayResults = (data) => {
    console.log(data);
    document.querySelector('#output #artist-title').innerHTML = "";
    document.querySelector('#output #track-list').innerHTML = "";
    tracks = data;
    let term = document.querySelector('input').value;
    let header = `<h1 class='artist-title'>${term} tracks</h1>`;
    document.querySelector('#output #artist-title').innerHTML += header;
    for (track of tracks) {
        let template = `<div class="track" id="${track.id}">${track.name}</div>`;
        document.querySelector('#output #track-list').innerHTML += template;
    }
    currentTrack = tracks[currentTrackIdx];
    displayTrack(currentTrack);
    document.querySelector('#next-btn').classList.remove('hidden');
    document.querySelector('#next-btn').classList.add('track-btn');
};

const displayTrack = track => {
    let title_template = `<h1 id='now-playing'>Now playing: ${track.name}</h1>`;
    let img_template = `<img class='album-img' src='${track.album.image_url}'>`;
    let player_template = `<iframe class='featured-track' src="https://open.spotify.com/embed?uri=spotify:track:${track.id};theme=white" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" data-testid="audio-player"></iframe>`;
    document.querySelector('#output #featured-content').innerHTML = title_template + img_template + player_template;
}

const nextTrack = () => {
    currentTrack = tracks[++currentTrackIdx];
    displayTrack(currentTrack);
}

document.querySelector('#search').onclick = search;
document.querySelector('#next-btn').onclick = nextTrack;