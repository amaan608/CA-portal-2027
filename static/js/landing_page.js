document.addEventListener("DOMContentLoaded", () => {
  console.log("raj script is running");

  const rightbox1btns = document.querySelectorAll(".rightbox1btn");
  const teamList = document.querySelector(".Team");
  const soloList = document.querySelector(".solo");

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

  function animateCount(el, target, duration = 3000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      const value = Math.floor(progress * target);
      el.textContent = value + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + "+"; // ensure final value
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

  // Create city markers on the map
  function createCityMarkers() {
    cities.forEach((city) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", `pin-${city.id}`);
      svg.setAttribute("class", "city-marker");
      svg.setAttribute("x", city.x - 12);
      svg.setAttribute("y", city.y - 22);
      svg.setAttribute("width", 32);
      svg.setAttribute("height", 32);
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.style.cursor = "pointer";

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M12 2C8.686 2 6 4.686 6 8C6 12.553 12 22 12 22C12 22 18 12.553 18 8C18 4.686 15.314 2 12 2ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"
      );
      path.setAttribute("fill", "#e74c3c");
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

  // Create all city markers
  createCityMarkers();
});
