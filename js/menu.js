const headerTag = document.querySelector("header")
const toggleMenuTag = document.querySelector("a.hamburger")

// FUNCTION TO SWITCH FROM/TO FIXED POSITION MENU TO PREVENT FLICKERING ON 0 TOP OF THE PAGE
document.addEventListener("scroll", function() {

    const pixelsTop = window.pageYOffset

    if(pixelsTop > 0) {
        headerTag.classList.add("fixed", "scroll-shadow")
    }
    else {
        headerTag.classList.remove("fixed", "scroll-shadow")
    }

})

// TOGGLE HAMBURGER MENU FOR MOBILE & ADD/REMOVE SHADOW
toggleMenuTag.addEventListener("click", function() {
    const pixelsTop = window.pageYOffset
    const headerHeight = headerTag.offsetHeight

    if(headerHeight <= 60) {
        headerTag.classList.add("header-open", "scroll-shadow")
    } 
    else {
        headerTag.classList.remove("header-open")
        if (pixelsTop <= 0) {
            headerTag.classList.remove("scroll-shadow") 
        }
    }

})


// SHOW/HIDE AND MINIMIZE MENU ON SCROLL
const showHeader = function () {
    headerTag.classList.remove("hidden")
}
const hideHeader = function () {
    headerTag.classList.add("hidden")
    headerTag.classList.remove("scroll-shadow")
}

showHeader()

let prevScroll = window.pageYOffset
document.addEventListener("scroll", function() {
    const currentScroll = window.pageYOffset

    if (currentScroll > prevScroll && currentScroll > 60) {
        hideHeader()
    } else if (currentScroll < prevScroll - 10 || currentScroll < 60) {
        showHeader()
    }

    if  (Math.abs(currentScroll - prevScroll) > 10) {
        headerTag.classList.remove("header-open");
    }

    prevScroll = currentScroll;

})

// CLOSE MENU ON LINK CLICK

const menuLink = document.querySelectorAll(".menu-link");

menuLink.forEach(function (link) {
    link.addEventListener("click", function() {
        headerTag.classList.remove("header-open");
    });    
})
