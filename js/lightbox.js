const allGalleryItems = document.querySelectorAll(".galleryItem");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalBg = document.querySelector(".modal-background");
const modalImage = document.querySelector(".modal-image");
let imageElement;
let imageCurrentWidth;
let imageMaxWidth;
let imageCurrentHeight;
let imageMaxHeight;
let isAtMaxSize;
let isZoomed = false;

// Create img element, add attributes to it and append it to the image container
function createImage (src, alt) {
    const image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);
    imageElement = modalImage.appendChild(image);
}

// Saves the widths and heights of the image container and the image element, which we use later 
// to check if the image is at its maximun size and also to update the cursor.
function updateImageSize () {
    imageCurrentWidth = modalImage.offsetWidth;
    imageMaxWidth = imageElement.naturalWidth;
    imageCurrentHeight = modalImage.offsetHeight;
    imageMaxHeight = imageElement.naturalHeight;
}

// Function check if image is displayed at its natural/maximum size or not
function checkMaxSize () {
    if (imageMaxWidth <= imageCurrentWidth + 20 && imageMaxHeight <= imageCurrentHeight + 20) {
        return true;
    } else {
        return false;
    }
}

// Fuction which updates the cursor on the lighbox image container depending of the size displayed and if it has been zoomed already.
function updateCursor () {
    if ( isAtMaxSize && !isZoomed) {
        modalImage.style.cssText = "cursor: auto";
    } else {
        modalImage.style.cssText = "cursor: pointer";
    }
}

// On image resize the observer updates the widths/heights which we use to check if the image is at maximum size. Also calls the cursor update
const observer = new ResizeObserver(entry => {
    updateImageSize();
    isAtMaxSize =  checkMaxSize();   
    updateCursor();
});

// Function to make the lighbox container visible. It creates an image in it with the src and alt of the original/target image which we clicked.
// This function also starts the resize observer to help the zoom function use the right widths/heigts of the image dispalyed.
function openLightbox (event) {
    event.preventDefault();
    
    const src = event.target.getAttribute("src");
    const alt = event.target.getAttribute("alt");

    createImage(src, alt);

    observer.observe(modalImage);

    imageElement.classList.add("fit-window");
    document.body.style.overflow = "hidden";
    modal.style.display = "block";

}

// The openLightbox function is used on all gallery links/items
for ( const galleryItem of allGalleryItems ) {
    galleryItem.addEventListener("click", openLightbox);
}

// This function hides the lightbox, removes the image element and resize observer(so that they are only used while the lightbox is open)
function closeLightbox() {
    modal.style.display = "none";        
    document.body.style.overflow = "auto";
    modalImage.removeChild(modalImage.firstChild);
    observer.unobserve(modalImage);
    isZoomed = false;
}

modalClose.addEventListener("click", closeLightbox);
modalBg.addEventListener("click", closeLightbox);


// Using isZoomed and isAtMaxSize variables to create conditions.
// Each condition updates the sizes of the image container and image element with css classes from lightbox.css (which creates the zoom in/out feature).
// When the lightbox first opens, the image takes the width from the 'fit-window' css class from lightbox.css by default. 
// On first click(zoom in) it takes the width from the 'natural-size' css class and the isZoomed variable is updated.
// On second click (zoom out) the isZoomed variable is reversed, so that it toggles the css classes of the image container and image element.
function zoom () {
    
    if (!isZoomed && isAtMaxSize) {
        return;
    } else if (!isZoomed && !isAtMaxSize) {
        modalImage.classList.add("zoom-full-size");
        imageElement.classList.remove("fit-window");
        imageElement.classList.add("natural-size"); 
        isZoomed = true;
    } else if (isZoomed) {
        modalImage.classList.remove("zoom-full-size");
        imageElement.classList.remove("natural-size");
        imageElement.classList.add("fit-window");
        isZoomed = false;
    };

}

modalImage.addEventListener("click", zoom);