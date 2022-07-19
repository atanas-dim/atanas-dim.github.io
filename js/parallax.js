// SCROLL PARALLAX
if (window.innerWidth > 479) {
  document.addEventListener("scroll", function () {
    const projectCard = document.querySelectorAll(".project-card");
    const topViewport = window.pageYOffset;
    // SCROLL POSITION AT TOP OF SCREEN + MIDDLE OF VIEWPORT TO FIND THE MIDDLE OF CURRENT VIEW
    const midViewport = topViewport + window.innerHeight / 2;
    projectCard.forEach((projectCard) => {
      // GET TOP POSITION OF EACH PROJECT CARD
      const topProjectCard = projectCard.offsetTop;
      // FIND MIDPOINT OF PROJECT CARD
      const midProjectCard = topProjectCard + projectCard.offsetHeight / 2;
      // GET DISTANCE FROM MIDDLE OF PROJECT CARD TO MIDDLE OF VIEWPORT
      const distanceCardViewport = midViewport - midProjectCard;
      const parallaxTags = projectCard.querySelectorAll("[data-parallax]");
      parallaxTags.forEach((tag) => {
        const speed = parseFloat(tag.getAttribute("data-parallax"));
        tag.style.transform = `translate(0, ${distanceCardViewport * speed}px)`;
      });
    });
  });
}

// Source:
// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript
function initSmoothScroll() {
  new SmoothScroll(document.documentElement, 70, 10);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

window.addEventListener("load", initSmoothScroll);
