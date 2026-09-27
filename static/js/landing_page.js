document.addEventListener("DOMContentLoaded", () => {
  console.log("raj script is running");

  const joinTabBtns = document.querySelectorAll(".join-tab-btn");
  const teamBenefits = document.getElementById("team-benefits");
  const soloBenefits = document.getElementById("solo-benefits");

  if (joinTabBtns.length > 0) {
    joinTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        joinTabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const mode = btn.getAttribute("data-mode");
        if (mode === "team") {
          if (teamBenefits) teamBenefits.style.display = "flex";
          if (soloBenefits) soloBenefits.style.display = "none";
        } else {
          if (teamBenefits) teamBenefits.style.display = "none";
          if (soloBenefits) soloBenefits.style.display = "flex";
        }
      });
    });
  }
  // Register / How To Step Tab Switcher
  const regTabButtons = document.querySelectorAll(".reg-tab-btn");
  const regCardTitle = document.getElementById("reg-card-title");
  const regCardDesc = document.getElementById("reg-card-desc");
  const regCard = document.getElementById("reg-card");

  const stepDetailsData = {
    "1": {
      title: '<span class="step-num">1.</span> Register',
      desc: "Sign up to become a Campus Ambassador at Alcheringa and join our dynamic community of students from across the country."
    },
    "2": {
      title: '<span class="step-num">2.</span> Complete and verify tasks',
      desc: "Review the tasks listed on your dashboard, follow the instructions, upload proof of completion, and wait for our team to verify your submission. Once approved, you will earn points."
    },
    "3": {
      title: '<span class="step-num">3.</span> Collect Rewards',
      desc: "As you accumulate points, you will be able to redeem rewards and incentives we have in store."
    }
  };

  if (regTabButtons.length > 0 && regCardTitle && regCardDesc) {
    regTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const stepKey = btn.getAttribute("data-step");
        if (!stepKey || !stepDetailsData[stepKey]) return;

        regTabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (regCard) {
          regCard.style.opacity = "0";
          regCard.style.transform = "translateY(4px)";
          setTimeout(() => {
            regCardTitle.innerHTML = stepDetailsData[stepKey].title;
            regCardDesc.textContent = stepDetailsData[stepKey].desc;
            regCard.style.opacity = "1";
            regCard.style.transform = "translateY(0)";
          }, 150);
        } else {
          regCardTitle.innerHTML = stepDetailsData[stepKey].title;
          regCardDesc.textContent = stepDetailsData[stepKey].desc;
        }
      });
    });
  }

  function animateCount(el, target, duration = 3000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString("en-IN") + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString("en-IN") + "+"; // ensure final value
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

  function showTooltip(cityData, targetElement) {
    if (!tooltip) return;
    const customMessage = `
        <div style="text-align: left; line-height: 1.45; font-family: 'Poppins', sans-serif;">
          <strong style="color: #FEC728; font-size: 14px; font-weight: 700;">${cityData.name}</strong><br>
          <span style="color: #FFFFFF; font-size: 12.5px;">Colleges: ${cityData.colleges}</span><br>
          <span style="color: #FFFFFF; font-size: 12.5px;">Ambassadors: ${cityData.ambassadors}</span>
        </div>
      `;
    tooltip.innerHTML = customMessage;

    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    tooltip.style.left = `${Math.round(x)}px`;
    tooltip.style.top = `${Math.round(y)}px`;
    tooltip.classList.remove("hidden");
    tooltip.classList.add("visible");
  }

  // Handle mouseout event
  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove("visible");
    tooltip.classList.add("hidden");
  }

  // Create city markers on the map
  function createCityMarkers() {
    if (!map) return;
    cities.forEach((city) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("id", `pin-${city.id}`);
      g.setAttribute("class", "city-marker");
      g.setAttribute("data-city-id", city.id);
      g.setAttribute("transform", `translate(${city.x - 12}, ${city.y - 22})`);
      g.style.cursor = "pointer";

      // Larger hit area for easy hovering
      const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      hitArea.setAttribute("cx", "12");
      hitArea.setAttribute("cy", "12");
      hitArea.setAttribute("r", "16");
      hitArea.setAttribute("fill", "transparent");
      hitArea.setAttribute("pointer-events", "all");
      g.appendChild(hitArea);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M12 2C8.686 2 6 4.686 6 8C6 12.553 12 22 12 22C12 22 18 12.553 18 8C18 4.686 15.314 2 12 2ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"
      );
      path.setAttribute("fill", "#FF3B30");
      path.setAttribute("stroke", "#FFFFFF");
      path.setAttribute("stroke-width", "0.6");
      path.setAttribute("pointer-events", "none");
      g.appendChild(path);

      if (isTouchDevice()) {
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          showTooltip(city, g);
          setTimeout(hideTooltip, 3000);
        });
      } else {
        g.addEventListener("mouseenter", () => showTooltip(city, g));
        g.addEventListener("mouseleave", hideTooltip);
      }
      map.appendChild(g);
    });
  }

  // Create all city markers
  createCityMarkers();

  const fxRevealTargets = document.querySelectorAll(
    ".box1, .box2, .box3, .box3-stat-card"
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
    ".box2para, .box3-title-top, .box3-title-bottom, .box3-stat-card"
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
