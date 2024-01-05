// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector(".search-form");
const url = new URL("https://pixabay.com/api/")


const galleryContainer = document.querySelector(".gallery");

const loader = document.querySelector(".loader");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value
  
  url.searchParams.append("key", "41612762-752dc9341b43071862b7b3b8c")
  url.searchParams.append("q", query)
  url.searchParams.append("image_type", "photo")
  url.searchParams.append("orientation", "horizontal");
  url.searchParams.append("safesearch", true);
  
  loader.style.display = "block";

    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json()
    })
    .then(imgs => {
      if (imgs.hits.length === 0) {

        iziToast.error({
          title: 'Error',
          position: 'center',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
      galleryContainer.innerHTML = imgs
        .hits
        .map((img) => {
          return `<li class="img-gallery-item"><a class="gallery-link" href="${img.largeImageURL}"><img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" width="${img.webformatWidth}"></a></li>`;
        })
        .join(""); 
  
    lightbox.refresh(); 
  }
    })
      .catch(error => {
      iziToast.error({
        title: 'Error',
        position: 'center',
        message: 'Sorry, there are no images matching your search query. Please try again later!',
      });
    })

      .finally(() => {
      loader.style.display = "none";
    });

});


const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});