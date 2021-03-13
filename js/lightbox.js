const allGalleryItems = document.querySelectorAll(".galleryItem");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalContent = document.querySelector(".modal-content");
const modalImage = document.querySelector(".modal-image");
const modalBg = document.querySelector(".modal-background");
const modalAlert = document.querySelector(".modal-alert");

for (const galleryItem of allGalleryItems) {

    galleryItem.addEventListener("click", function(event) {
        event.preventDefault();

        // Get the HTML of the clicked gallery item and make it the content of the modal image div.
        // Add cursor style to the image div and make it visible. Also change the overflow of 
        // the body to avoid scroll behind the lightbox on most browsers.
        const currentImageHTML = galleryItem.innerHTML;
        modalImage.innerHTML = currentImageHTML;
        modalImage.firstElementChild.classList.add("fit-window");
        modalImage.style.cssText = "cursor: pointer;"
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Use a variable to count the times the image in the lightbox is clicked to zoom in or out.
        // On mouse over check if the image is already display at it's maximum width. If yes, then 
        // use the timeClicked variable to avoid the following zoom in/out feature being applied.
        let timesClicked = 0;
        modalImage.addEventListener("mouseover", function () {
            const imageCurrentWidth = modalImage.offsetWidth;
            const imageMaxWidth = modalImage.firstElementChild.naturalWidth;
            if (imageMaxWidth <= imageCurrentWidth + 10) {
                modalImage.style.cssText = "cursor: auto;"
                timesClicked = 0;
            };
        });
        
        // On first click make the image appear at its natural/maximum width and make its container scrollable.
        // On second click reverse this acton and make the image fit inside the lightbox.
        modalImage.addEventListener("click", function() {
            timesClicked++;
            const imageCurrentWidth = modalImage.offsetWidth;
            const imageMaxWidth = modalImage.firstElementChild.naturalWidth;

            if (timesClicked === 1 && imageMaxWidth > imageCurrentWidth) {
                modalImage.classList.add("zoom-full-size");
                modalImage.firstElementChild.classList.remove("fit-window");
                modalImage.firstElementChild.classList.add("natural-size");
            } else if (timesClicked === 2) {
                modalImage.classList.remove("zoom-full-size");
                modalImage.firstElementChild.classList.remove("natural-size");
                modalImage.firstElementChild.classList.add("fit-window");
                timesClicked = 0;
            };
            
        });

        // Funtion to hide the lightbox, change the body overflow as it was before and remove the content of the image container div.
        function closeLightbox() {
            modal.style.display = "none";        
            document.body.style.overflow = "auto";
            modalImage.removeChild(modalImage.firstChild);
        };
    
        // Close function is called when Close icon or background area is clicked.
        modalClose.addEventListener("click", closeLightbox);
        modalBg.addEventListener("click", closeLightbox);

    });

};


