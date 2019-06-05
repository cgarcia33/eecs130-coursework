// Global Variables:
const serverURL = 'https://cg-hw07.herokuapp.com/';
let activeCardID = -1
let appPhotos;
let appUsers;

// functions:
const loadCardListView = (imagesFromServer) => {
    // save to a global variable so this data will be
    // accessible to the other functions:
    appPhotos = imagesFromServer;

    //clear out old cards (if there are any):
    document.querySelector('.cards').innerHTML = '';

    // create new ones (based on photos list)
    let i = 0;
    for (image of appPhotos) {
        const template = `
            <li class="card" data-index="${i}">
                <div class="image" style="background-image:url('${image.image_url}')"></div>
            </li>`;
        i++;
        document.querySelector('.cards').innerHTML += template;
    }
    attachEventHandlers();
};

const getImagesFromServer = () => {
    fetch(serverURL + 'photos')
        .then((response) => {
            return response.json();
        })
        .then(loadCardListView);
};

const getCurrentPhoto = () => {
    return appPhotos[activeCardID];
};

const loadCardDetailView = () => {
    const container = document.querySelector('.preview_box');
    const photoItem = getCurrentPhoto();
    const imageURL = `url("${photoItem.image_url}")`;
    container.querySelector('.featured_image').style.backgroundImage = imageURL;
    container.querySelector('.caption').innerHTML = getPhotoDetailTemplate(photoItem);
    container.querySelector('.like').onclick = likePhoto;
    fetchComments(photoItem);

    // update CSS:
    container.classList.add('active');
    document.querySelector('main').style.overflow = 'hidden';
};

const showPhotoDetail = (e) => {
    activeCardID = parseInt(e.target.parentElement.getAttribute('data-index'));
    loadCardDetailView();
};

const formatDate = (date) => {
    date = new Date(date)
    return date.toDateString();
};

const getPhotoDetailTemplate = photoItem => {
    let template = `
        <h2 class="title">${photoItem.title}</h2>
        <p class="handle">@${photoItem.username}</p>
        <p class="likes">Likes: ${photoItem.likes}</p>
        <p class="date">${formatDate(photoItem.date)}</p>
        <button class="like">like</button>`;
    return template;
};

const hidePhoto = (e) => {
    const container = document.querySelector('.preview_box');
    container.classList.remove('active');
    document.querySelector('main').style.overflow = 'auto';
};

const showNextPhoto = (e) => {
    ++activeCardID;
    if (activeCardID >= appPhotos.length) { activeCardID = 0; }
    loadCardDetailView();
};

const showPreviousPhoto = (e) => {
    --activeCardID;
    if (activeCardID < 0) { activeCardID = appPhotos.length - 1; }
    loadCardDetailView();
};

const attachEventHandlers = () => {
    for (card of document.querySelectorAll('.image')) {
        card.onclick = showPhotoDetail;
    }
    document.querySelector('.close').onclick = hidePhoto;
    document.querySelector('.featured_image').onclick = showNextPhoto;
    // document.querySelector('.caption').onclick = showNextPhoto;
    document.querySelector('.next').onclick = showNextPhoto;
    document.querySelector('.prev').onclick = showPreviousPhoto;
    document.querySelector('select').onchange = filterByUser;
};

const getUsersFromServer = () => {
    fetch(serverURL + 'users')
        .then((response) => {
            return response.json();
        })
        .then(buildUserMenu);
};

const buildUserMenu = users => {
  appUsers = users;
  let idx = 1;
  for (user of users) {
    let template = `<option value="${idx}">${user.username}</option>`;
    document.querySelector("#users").innerHTML += template;
    idx++;
  }
}

const filterByUser = e => {
  fetch(`${serverURL}photos/?user_id=${e.target.value}`)
      .then((response) => {
          return response.json();
      })
      .then(loadCardListView);
}

const likePhoto = () => {
  const photo = getCurrentPhoto();
  fetch(`${serverURL}photos/${photo.id}`, {
       method: 'PATCH',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           "likes": photo.likes + 1
       })
   })
   .then(response => response.json())
   .then(data => {
       appPhotos[activeCardID] = data;
       loadCardDetailView();
   });
}

const fetchComments = photo => {
  fetch(`${serverURL}comments/?photo_id=${photo.id}`)
    .then((response) => {
      return response.json();
    })
    .then(loadComments);
}

const loadComments = comments => {
  if (comments && comments.length) {
    const container = document.querySelector(".caption");
    container.innerHTML += `
    <div class="comments">
      <h3>Comments</h3>
    </div>`;
    for (comment of comments) {
      template = `<p>${comment.text}</p>`;
      container.querySelector(".comments").innerHTML += template;
    }
    container.querySelector('.like').onclick = likePhoto;
  }
}

// Initialize
getImagesFromServer();
getUsersFromServer();
