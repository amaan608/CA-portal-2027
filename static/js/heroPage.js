
function initHeroPage() {
  const counterElements = document.querySelectorAll(".num, .counts");

  const animateCount = (element) => {
    if (element.classList.contains("has-animated")) return;
    element.classList.add("has-animated");

    const target = parseFloat(element.getAttribute("data-target"));
    if (isNaN(target)) return;
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 1200;
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
  }, { threshold: 0.1 });

  counterElements.forEach((counter) => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animateCount(counter);
    } else {
      observer.observe(counter);
    }
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroPage);
} else {
  initHeroPage();
}