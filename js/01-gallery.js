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

  const modalWindow = basicLightbox.create(
    `
  	<img width="1400" height="900" src="${imgLink.href}">
  `
  );

  modalWindow.show();

  document.addEventListener("keydown", closeImageModal);

  function closeImageModal(e) {
    if (e.key === "Escape") {
      // return document
      //   .querySelector(".basicLightbox")
      //   .classList.remove("basicLightbox--visible");

      return modalWindow.close();
    }
  }
}
