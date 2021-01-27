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


// SHOW/HIDE MENU ON SCROLL

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
    }
    else {
        showHeader()
    }

    prevScroll = currentScroll

})


