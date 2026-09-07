
document.addEventListener("DOMContentLoaded", () => {
  const counterElements = document.querySelectorAll(".num");

  const animateCount = (element) => {
    const target = parseFloat(element.getAttribute("data-target"));
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 1000;
    const frameRate = 16;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;

    let currentCount = 0;

    const updateCounter = () => {
      currentCount += increment;

      if (currentCount < target) {
        element.innerText = Math.ceil(currentCount) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.innerText = target + suffix;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach((counter) => {
    observer.observe(counter);
  });

  const aftermoviePreview = document.querySelector(".aftermovie-preview");
  const heroRoot = document.querySelector(".heroSectionn");

  if (aftermoviePreview && heroRoot) {
    const setArcState = (active) => {
      heroRoot.classList.toggle("is-hovered", active);
    };

    aftermoviePreview.addEventListener("mouseenter", () => setArcState(true));
    aftermoviePreview.addEventListener("mouseleave", () => setArcState(false));
    aftermoviePreview.addEventListener("focusin", () => setArcState(true));
    aftermoviePreview.addEventListener("focusout", () => setArcState(false));
  }
});