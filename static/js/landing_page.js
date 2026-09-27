document.addEventListener("DOMContentLoaded", () => {
  if (window.__landingPageInit) return;
  window.__landingPageInit = true;
  console.log("raj script is running");

  // Join as a Team or Solo Toggle Handler
  const btnTeam = document.getElementById("join-toggle-team");
  const btnSolo = document.getElementById("join-toggle-solo");
  const contentTeam = document.getElementById("join-content-team");
  const contentSolo = document.getElementById("join-content-solo");

  if (btnTeam && btnSolo && contentTeam && contentSolo) {
    btnTeam.addEventListener("click", () => {
      btnTeam.classList.add("active");
      btnTeam.setAttribute("aria-pressed", "true");
      btnSolo.classList.remove("active");
      btnSolo.setAttribute("aria-pressed", "false");

      contentTeam.classList.add("active");
      contentSolo.classList.remove("active");
    });

    btnSolo.addEventListener("click", () => {
      btnSolo.classList.add("active");
      btnSolo.setAttribute("aria-pressed", "true");
      btnTeam.classList.remove("active");
      btnTeam.setAttribute("aria-pressed", "false");

      contentSolo.classList.add("active");
      contentTeam.classList.remove("active");
    });
  }

  // Register Section Step Switching Handler
  const stepButtons = document.querySelectorAll(".register-step-btn");
  const stepContents = document.querySelectorAll(".register-step-content");

  if (stepButtons.length && stepContents.length) {
    stepButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const stepNum = btn.getAttribute("data-step");
        stepButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        stepContents.forEach((c) => c.classList.remove("active"));
        const targetContent = document.getElementById(`step-content-${stepNum}`);
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  }

  // Backward compatibility fallback for legacy rightbox1btn if present
  const rightbox1btns = document.querySelectorAll(".rightbox1btn");
  const teamList = document.querySelector(".Team");
  const soloList = document.querySelector(".solo");

  if (rightbox1btns.length && teamList && soloList) {
    rightbox1btns.forEach((button) => {
      button.addEventListener("click", () => {
        rightbox1btns.forEach((btn) => btn.classList.remove("act"));
        button.classList.add("act");

        if (button.textContent.includes("Team")) {
          teamList.style.display = "block";
          soloList.style.display = "none";
        } else {
          teamList.style.display = "none";
          soloList.style.display = "block";
        }
      });
    });
  }

  console.log("Buttons found:", rightbox1btns.length);
console.log("Less arrows found:", document.querySelectorAll(".steps .less").length);
console.log("Counts found:", document.querySelectorAll(".counts").length);


  document.querySelectorAll(".steps .step").forEach((downArrow) => {
    downArrow.addEventListener("click", () => {
      const stepsDiv = downArrow.parentElement;
      const moreArrow = stepsDiv.querySelector(".step");
      const paragraph = stepsDiv.nextElementSibling;

      // Show paragraph
      paragraph.classList.add("show");

    });
  });


  document.querySelectorAll(".steps .less").forEach((downArrow) => {
    downArrow.addEventListener("click", () => {
      const stepsDiv = downArrow.parentElement;
      const moreArrow = stepsDiv.querySelector(".more");
      const paragraph = stepsDiv.nextElementSibling;

      // Show paragraph
      paragraph.classList.add("show");

      // Toggle arrow icons
      downArrow.style.display = "none";
      moreArrow.style.display = "inline";
    });
  });

  

  document.querySelectorAll(".steps .more").forEach((upArrow) => {
    upArrow.addEventListener("click", () => {
      const stepsDiv = upArrow.parentElement;
      const downArrow = stepsDiv.querySelector(".less");
      const paragraph = stepsDiv.nextElementSibling;

      // Hide paragraph
      paragraph.classList.remove("show");

      // Toggle arrow icons
      upArrow.style.display = "none";
      downArrow.style.display = "inline";
    });
  });

  function animateCount(el, target, duration = 2500) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      const value = Math.floor(progress * target);
      if (el.dataset.format === "comma" || target >= 100000) {
        el.textContent = value.toLocaleString("en-IN") + "+";
      } else {
        el.textContent = value + "+";
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (el.dataset.format === "comma" || target >= 100000) {
          el.textContent = target.toLocaleString("en-IN") + "+";
        } else {
          el.textContent = target + "+";
        }
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counts = entry.target.querySelectorAll(".counts");
          counts.forEach((el) => {
            const target = parseInt(el.dataset.target);
            animateCount(el, target);
          });

          observer.unobserve(entry.target); // Only run once
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
  );

  document
    .querySelectorAll("#stats-section, #achievements-section")
    .forEach((section) => {
      observer.observe(section);
    });

  const map = document.getElementById("india-map");
  const tooltip = document.getElementById("map-tooltip");

  const cities = [
    {
      id: "patna-marker",
      name: "Patna",
      x: 375,
      y: 300,
      colleges: 20,
      ambassadors: 50,
    },
    {
      id: "indore-marker",
      name: "Indore",
      x: 210,
      y: 360,
      colleges: 6,
      ambassadors: 20,
    },
    {
      id: "bangalore-marker",
      name: "Bangalore",
      x: 230,
      y: 560,
      colleges: 10,
      ambassadors: 30,
    },
    {
      id: "bhopal-marker",
      name: "Bhopal",
      x: 245,
      y: 350,
      colleges: 5,
      ambassadors: 10,
    },
    {
      id: "mumbai-marker",
      name: "Mumbai",
      x: 140,
      y: 450,
      colleges: 8,
      ambassadors: 25,
    },
    {
      id: "guwahati-marker",
      name: "Guwahati",
      x: 493,
      y: 294,
      colleges: 15, // Adjust as needed
      ambassadors: 40, // Adjust as needed
    },
    {
      id: "ahmedabad-marker", 
      name: "Ahmedabad",
      x: 128,
      y: 358,
      colleges: 6, // Adjust as needed
      ambassadors: 20, // Adjust as needed
    },
    {
      id: "pune-marker",
      name: "Pune",
      x: 165,
      y: 460,
      colleges: 6,
      ambassadors: 15,
    },
    {
      id: "trichy-marker",
      name: "Tiruchirappalli",
      x: 245,
      y: 610,
      colleges: 5,
      ambassadors: 15,
    },
    {
      id: "lucknow-marker",
      name: "Lucknow",
      x: 300,
      y: 270,
      colleges: 18,
      ambassadors: 45,
    },
    {
      id: "mohali-marker",
      name: "Mohali",
      x: 190,
      y: 175,
      colleges: 12,
      ambassadors: 30,
    },
    {
      id: "rishikesh-marker",
      name: "Rishikesh",
      x: 250,
      y: 210,
      colleges: 8,
      ambassadors: 22,
    },
    {
      id: "kurukshetra-marker",
      name: "Kurukshetra",
      x: 220,
      y: 210,
      colleges: 10,
      ambassadors: 25,
    },
    {
      id: "jaipur-marker",
      name: "Jaipur",
      x: 200,
      y: 275,
      colleges: 25,
      ambassadors: 60,
    },
    {
      id: "bhubaneshwar-marker",
      name: "Bhubaneshwar",
      x: 380,
      y: 410,
      colleges: 15,
      ambassadors: 35,
    },
    {
      id: "ropar-marker",
      name: "Ropar",
      x: 200,
      y: 190,
      colleges: 7,
      ambassadors: 18,
    },
    {
      id: "nagpur-marker",
      name: "Nagpur",
      x: 257,
      y: 405,
      colleges: 14,
      ambassadors: 33,
    },
    {
      id: "delhi-marker",
      name: "Delhi",
      x: 215,
      y: 237,
      colleges: 30,
      ambassadors: 75,
    },
    {
      id: "kolkata-marker",
      name: "Kolkata",
      x: 415,
      y: 360,
      colleges: 22,
      ambassadors: 55,
    },
    {
      id: "agartala-marker",
      name: "Agartala",
      x: 485,
      y: 341,
      colleges: 14,
      ambassadors: 33,
    },
    {
      id: "silchar-marker",
      name: "Silchar",
      x: 513,
      y: 320,
      colleges: 16,
      ambassadors: 30,
    },
    {
      id: "aizawl-marker",
      name: "Aizawl",
      x: 513,
      y: 345,
      colleges: 16,
      ambassadors: 30,
    },
    {
      id: "gangtok-marker",
      name: "Gangtok",
      x: 435,
      y: 258,
      colleges: 22,
      ambassadors: 55,
    },
    {
      id: "hyderabad-marker",
      name: "Hyderabad",
      x: 243,
      y: 471,
      colleges: 6,
      ambassadors: 15,
    },
  ];

  // Check if the device supports touch events
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  console.log(isTouchDevice());

  function showTooltip(cityData, event) {
    const customMessage = `
        <div style="text-align: left; line-height: 1.4;">
          <strong>${cityData.name}</strong><br>
          Colleges: ${cityData.colleges}<br>
          Ambassadors: ${cityData.ambassadors}
        </div>
      `;
    tooltip.innerHTML = customMessage;

    const targetElement = event.target.closest(".city-marker");
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const x = rect.left + window.scrollX + rect.width / 2;
    const y = rect.top + window.scrollY;

    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 45}px`;
    tooltip.classList.remove("hidden");
    tooltip.classList.add("visible");
  }

  // Handle mouseout event
  function hideTooltip() {
    tooltip.classList.remove("visible");
    tooltip.classList.add("hidden");
  }
  function handleDesktopMouseOver(event) {
    const cityMarker = event.target.closest(".city-marker");
    if (!cityMarker) return;
    const cityId = cityMarker.getAttribute("data-city-id");
    const cityData = cities.find((city) => city.id === cityId);
    if (!cityData) return;
    showTooltip(cityData, event);
  }

  function handleDesktopMouseOut() {
    hideTooltip();
  }

  function handleMobileClick(event) {
    const cityMarker = event.target.closest(".city-marker");
    if (!cityMarker) return;
    const cityId = cityMarker.getAttribute("data-city-id");
    const cityData = cities.find((city) => city.id === cityId);
    if (!cityData) return;

    // Toggle tooltip visibility on click
    if (tooltip.classList.contains("visible")) {
      hideTooltip();
    } else {
      showTooltip(cityData, event);
    }

    // Hide after a timeout
    setTimeout(() => {
      hideTooltip();
    }, 2500);
  }

  // Create city markers on the map using vibrant red location pin
  function createCityMarkers() {
    if (!map) return;
    cities.forEach((city) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", `pin-${city.id}`);
      svg.setAttribute("class", "city-marker");
      svg.setAttribute("x", city.x - 11);
      svg.setAttribute("y", city.y - 28);
      svg.setAttribute("width", 22);
      svg.setAttribute("height", 31);
      svg.setAttribute("viewBox", "0 0 22 31");
      svg.style.cursor = "pointer";

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M11 0.263C19.5 0.263 22 7.263 22 11.263C22 15.263 11 30.263 11 30.263C11 30.263 0 16.263 0 11.263C0 6.263 2.5 0.263 11 0.263ZM10.4 7.263C8.246 7.263 6.5 8.925 6.5 10.975C6.5 13.024 8.246 14.686 10.4 14.686C12.554 14.686 14.3 13.024 14.3 10.975C14.3 8.925 12.554 7.263 10.4 7.263Z"
      );
      path.setAttribute("fill", "#DE2F2A");
      svg.appendChild(path);

      svg.setAttribute("data-city-id", city.id);

      if (isTouchDevice()) {
        svg.addEventListener("click", handleMobileClick);
      } else {
        svg.addEventListener("mouseover", handleDesktopMouseOver);
        svg.addEventListener("mouseout", handleDesktopMouseOut);
      }
      map.appendChild(svg);
    });
  }

  // City markers disabled - removed red dots per user request
  // createCityMarkers();

  const fxRevealTargets = document.querySelectorAll(
  ".join-section, .box2, .india-section"
  );

  fxRevealTargets.forEach((el) => el.classList.add("fx-hidden"));

  const fxObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("fx-hidden");
          entry.target.classList.add("fx-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fxRevealTargets.forEach((el) => fxObserver.observe(el));

  // ---- Slide-in entrance for paragraphs/text blocks ----
  const fxSlideTargets = document.querySelectorAll(
    ".box2para, .box3first p, .box3secondleft, .box3secondright"
  );

  fxSlideTargets.forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "fx-slide-left" : "fx-slide-right");
  });

  const fxSlideObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fx-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fxSlideTargets.forEach((el) => fxSlideObserver.observe(el));
});
