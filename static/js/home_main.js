


document.addEventListener("DOMContentLoaded",() => {



// var navbar = document.querySelector("nav");
var navbarlink1 = document.getElementById("navlink1");
var navbarlink2 = document.getElementById("navlink2");
var navbarlink3 = document.getElementById("navlink3");
var navbarlink4 = document.getElementById("navlink4");
var navbarlink5 = document.getElementById("navlink5");
// var navbarbutton = document.getElementById("join-button");
// var navbarbuttontext = document.getElementById("join-button-text");

window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 200) {
    // navbar.classList.add("scrolled");
    navbarlink1.classList.add("scroll");
    navbarlink2.classList.add("scroll");
    navbarlink3.classList.add("scroll");
    navbarlink4.classList.add("scroll");
    navbarlink5.classList.add("scroll");
    // navbarbutton.classList.add("scroll");
    // navbarbuttontext.classList.add("scroll");
  } else {
    // navbar.classList.remove("scrolled");
    navbarlink1.classList.remove("scroll");
    navbarlink2.classList.remove("scroll");
    navbarlink3.classList.remove("scroll");
    navbarlink4.classList.remove("scroll");
    navbarlink5.classList.remove("scroll");
    // navbarbutton.classList.remove("scroll");
    // navbarbuttontext.classList.remove("scroll");
  }
};


/*alcher 2026 js*/
     const testimonials = [
  {
    pfp: "/static/images/pfp1.jpg",
    image: "/static/images/pfp1.jpg",
    name: "- Emadadul Hoq Milon",
    text: "l represented Alcheringa, IIT Guwahati, last year. It was a great opportunity to represent this lovely program as a campus ambassador. The entire experience was incredible. I gained fresh knowledge from this experience, which also aided in my development of leadership, management, and communication abilities. We are pleased to participate in this monumental occasion. We aim to attend this major event every year and strengthen our friendship. Finally, I want to express my gratitude to the entire Alcheringa team for picking me up and providing me with this chance, as well as to my friend Prashams Matcha.",
  },
  {
    pfp: "/static/images/pfp5.jpg",
    image: "/static/images/pfp5.jpg",
    name: "- Nandini",
    text: "Being a part of team Alcheringa was a beautiful learning experience, and learning becomes fun, when people are supportive. Thanks to Siddhant andAkshara, two heads of Alcheringa for their support and my friends Arunav and Debashish, who made the journey extremely a smooth run, with their hands in crisis. Made alot of mistakes, and learnt alot of new things. A journey, worth remembering, a journey with it's own ups and downs to be cherished. Also, huge thanks to all the participants for cooperating in making the event successful.",
  },
  {
    pfp: "/static/images/pfp6.jpeg",
    image: "/static/images/pfp6.jpeg",
    name: "- Rishav Dhar",
    text: "I received significant experience as a campus ambassador at Alcheringa, IIT-Guwahati's annual festival. As an introvert, I earned the chance to create interactions, build networks, and, most importantly, a sense of self in my own campus. In addition, as the highest-scoring campus ambassador in the country, I received an invitation to attend Alcheringa live at IIT-Guwahati. Alcheringa captivated me. Hail Alcher!",
  },
  {
    pfp: "/static/images/pfp7.jpg",
    image: "/static/images/pfp7.jpg",
    name: "- Anurag Dutta",
    text: "Being a Campus Ambassador for Alcheringa, IIT Guwahati, was a highly enriching experience that allowed me to develop new skills in networking, event coordination, and team collaboration. The role gave me the opportunity to connect with diverse individuals, work closely with both my peers at Royal Global University and the IIT Guwahati team, and contribute participants to the festival while gaining valuable exposure to large-scale event management. As a performer, Alcheringa also provided me with the platform to showcase my talent on a prestigious stage while simultaneously building connections with sponsors and brands associated with the event. This experience not only enhanced my interpersonal skills but also broadened my perspective on cultural events, making it one of the most rewarding journeys of my academic and artistic life.",
  }
];

let currentIndex = 0;



const mainImage = document.querySelector(".frame2 > div img");
const textElement = document.querySelector(".text");
const nameElement = document.querySelector(".name");

function renderTestimonial(index) {
  const data = testimonials[index];
  mainImage.src = data.image;
  textElement.textContent = data.text;
  nameElement.textContent = data.name;
  updateActiveDot(); // new
}


document.querySelector(".left-arrow").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(currentIndex);
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  renderTestimonial(currentIndex);
});


document.querySelectorAll(".pfp img").forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    renderTestimonial(currentIndex);
    
  });
});


renderTestimonial(currentIndex);
const dotsContainer = document.querySelector(".dots-container");

// Create dots dynamically
testimonials.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === currentIndex) dot.classList.add("active");

  dot.addEventListener("click", () => {
    currentIndex = index;
    renderTestimonial(currentIndex);
    updateActiveDot();
  });

  dotsContainer.appendChild(dot);
});

function updateActiveDot() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}


// Mobile swipe support
let startX = 0;

document.querySelector(".frame2").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector(".frame2").addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // swipe left
      currentIndex = (currentIndex + 1) % testimonials.length;
    } else {
      // swipe right
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    }
    renderTestimonial(currentIndex);
  }
});


     
     
     const upApos = document.querySelector(".up-apos img");
      const downApos = document.querySelector(".down-apos img");

      let prevAngleUp = 0;
      let prevAngleDown = 0;

      document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        rotateToCursor(
          upApos,
          mouseX,
          mouseY,
          (angle) => (prevAngleUp = angle)
        );
        rotateToCursor(
          downApos,
          mouseX,
          mouseY,
          (angle) => (prevAngleDown = angle)
        );
      });

      function rotateToCursor(el, mouseX, mouseY, updatePrevAngle) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = angleRad * (180 / Math.PI);

        el.style.transform = `rotate(${angleDeg}deg)`;
        updatePrevAngle(angleDeg);
      }


  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faq = question.parentElement;
      faq.classList.toggle("open");
    });
  });
/*Alcher 2026 end*/
})