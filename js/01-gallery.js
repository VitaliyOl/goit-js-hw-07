import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListEl = document.querySelector(".gallery");

const newGalleryListMarkup = createGalleryMarkup(galleryItems);

galleryListEl.insertAdjacentHTML("beforeend", newGalleryListMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ original, preview, description }) =>
        `
   <div class="gallery__item">
   <a class="gallery__link" href="${original}">
     <img
       class="gallery__image"
       src="${preview}"
       data-source="large-image.jpg"
       alt="${description}"
     />
   </a>
 </div>
     `
    )
    .join("");
}

const refs = {
  galleryItem: document.querySelector(".gallery__item"),
  galleryLink: document.querySelector(".gallery__link"),
  galleryImage: document.querySelector(".gallery__image"),
};

galleryListEl.addEventListener("click", onClick);

function onClick(e) {
  e.preventDefault();

  let imgLink = e.target.closest("a");

  if (!imgLink) {
    return;
  }

  const instance = basicLightbox.create(
    `
  	<img width="1400" height="900" src="${imgLink.href}">
  `
  );

  instance.show();

  window.addEventListener("keydown", closeImageModal);

  function closeImageModal(e) {
    if (e.key === "Escape") {
      console.log(window.event);
      instance.close();
      window.removeEventListener("keydown", closeImageModal);
      return;
    }
  }

  window.addEventListener("click", removeListenerClick);

  function removeListenerClick() {
    window.removeEventListener("click", removeListenerClick);
  }

  //// onShow: (instance)

  // document.onkeydown = function (evt) {
  //   evt = evt || window.event;
  //   var isEscape = false;
  //   if ("key" in evt) {
  //     isEscape = evt.key === "Escape" || evt.key === "Esc";
  //   } else {
  //     isEscape = evt.keyCode === 27;
  //   }
  //   if (isEscape) {
  //     instance.close();
  //   }
  // };
}
