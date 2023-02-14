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
       data-source="${original}"
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

  let img = e.target.nodeName;

  if (img != "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
  	<img width="1400" height="900" src="${e.target.dataset.source}">
  `,
    {
      onShow: () => document.addEventListener("keydown", onEsc),
      onClose: () => document.removeEventListener("keydown", onEsc),
    }
  );

  instance.show();

  function onEsc(e) {
    if (e.code === "Escape" || e.key === "Escape") {
      instance.close();
    }
  }

  // let imgLink = e.target.closest("a");

  // if (!imgLink) {
  //   return;
  // }

  // const instance = basicLightbox.create(
  //   `
  // 	<img width="1400" height="900" src="${imgLink.href}">
  // `
  // );

  // instance.show();

  // window.addEventListener("keydown", closeImageModal);

  // function closeImageModal(e) {
  //   if (e.key === "Escape") {
  //     console.log(window.event);
  //     instance.close();
  //     window.removeEventListener("keydown", closeImageModal);
  //     return;
  //   }
  // }
}
