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

