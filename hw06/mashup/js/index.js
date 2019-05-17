const search = ev => {
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/spotify/simple/v1/search?q=${term}&type=track`;
    fetch(url)
        .then(response => response.json())
        .then(displayAlbum)
        .then(searchTweets);
}

const searchTweets = () => {
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/twitter/simple/1.1/search/tweets.json?q=${term}`;
    fetch(url)
        .then(response => response.json())
        .then(displayTweets)
        .then(searchVids);
}

const searchVids = () => {
    let term = document.querySelector('input').value;
    let url = `https://www.apitutor.org/youtube/simple/?q=${term}+&type=video`;
    fetch(url)
        .then(response => response.json())
        .then(displayVids);
}

const displayAlbum = data => {
    let term = document.querySelector('input').value;
    document.querySelector('#output #album-player').innerHTML = "";
    let albumID = data[0].album.id;
    let albumTitle = `<h3>${term} album</h3>`;
    let albumTemplate = `<iframe src="https://open.spotify.com/embed/album/${albumID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    document.querySelector('#album-player').innerHTML += albumTitle + albumTemplate;
}

const displayTweets = data => {
    let term = document.querySelector('input').value;
    document.querySelector('#output #tweets').innerHTML = "";
    let tweetsTitle = `<h3>${term} tweets</h3>`;
    document.querySelector('#output #tweets').innerHTML += tweetsTitle;
    for (tweet of data) {
        let tweetTemplate = `<div class="tweet">@${tweet.screen_name}<br/>${tweet.text}</div>`;
        document.querySelector('#output #tweets').innerHTML += tweetTemplate;
    }
}

const displayVids = data => {
    let term = document.querySelector('input').value;
    document.querySelector('#output #vids').innerHTML = "";
    document.querySelector('#output #vids').innerHTML += `<h3 class="vid-title">${term} YouTube videos</h3>`
    for (vid of data) {
        let id = getVidID(vid.url);
        let vid_template = `<iframe id="ytplayer" type="text/html" width="640" height="360"
        src="https://www.youtube.com/embed/${id}?autoplay=0"
        frameborder="0"></iframe>`;
        document.querySelector('#output #vids').innerHTML += vid_template;
    }
}

const getVidID = url => {
    return url.split('v=')[1];
}

document.querySelector('#search').onclick = search;