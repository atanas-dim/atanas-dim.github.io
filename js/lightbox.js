const allGalleryItems = document.querySelectorAll(".galleryItem");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalBg = document.querySelector(".modal-background");
const modalImage = document.querySelector(".modal-image");
let imageElement;
let imageCurrentWidth;
let imageMaxWidth;
let timesClicked = 0;

// Create img element, add attributes to it and append it to the image container
function createImage (src, alt) {
    const image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);
    imageElement = modalImage.appendChild(image);
}

// Saves the widths of the image container and the image element, which we use later 
// to check if the image can be zoomed and also to update the cursor.
function updateImageWidths () {
    imageCurrentWidth = modalImage.offsetWidth;
    imageMaxWidth = imageElement.naturalWidth;
}

// Fuction which updates the cursor on the lighbox image container depending of the size displayed.
// If the image is already at its max size/width and can't be zoomed, then cursor is auto.
// If the image can be zoomed in and then zoomed out, then the cursor is a pointer.
function updateCursor () {
    if (imageMaxWidth <= imageCurrentWidth && timesClicked !== 2) {
        modalImage.style.cssText = "cursor: auto";
    } else if (imageMaxWidth > imageCurrentWidth || timesClicked === 2) {
        modalImage.style.cssText = "cursor: pointer";
    }
}

// On image resize the observer updates the widths which we use to decide if the image can be zoomed in or not. Also calls the cursor update
const observer = new ResizeObserver(entry => {
    updateImageWidths();
    updateCursor();    
});

// Function to make the lighbox container visible. It creates an image in it with the src and alt of the original/target image which we clicked.
// This function also starts the resize observer to help the zoom function use the right widths of the image dispalyed.
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
}

modalClose.addEventListener("click", closeLightbox);
modalBg.addEventListener("click", closeLightbox);


// Use counter to check how many times the image has been clicked.
// Then use statements to adjust the zoom/width of the image (which creates zoom in/out feature).
// On first click the image takes the width from the 'fit-window' css class. On the second click it 
// takes the width from the 'natural-size' css class (defined in lightbox.css)
// Here we use the maximum/natural width of the target image and the current width of the image container 
// to check if the image has been already displayed at its max size. If yes, then the counter is reversed to 0 value to disable zoom in.
function zoom () {

    timesClicked++;

    if (timesClicked === 1 && imageMaxWidth <= imageCurrentWidth + 10) {
        timesClicked = 0;
    } else if (timesClicked === 1 && imageMaxWidth > imageCurrentWidth + 10) {
        modalImage.classList.add("zoom-full-size");
        imageElement.classList.remove("fit-window");
        imageElement.classList.add("natural-size"); 
    } else if (timesClicked === 2) {
        modalImage.classList.remove("zoom-full-size");
        imageElement.classList.remove("natural-size");
        imageElement.classList.add("fit-window");
        timesClicked = 0;
    };
}

modalImage.addEventListener("click", zoom);