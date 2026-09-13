const body = document.body;
const themeToggle =document.getElementById("theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks =document.querySelector(".nav-links");
const year =document.getElementById("year");
const yellowPopup = document.getElementById('yellow-popup');
const yellowImage = document.getElementById('yellow-image');
const yellowClose = document.getElementById('yellow-close');



year.textContent =
  new Date().getFullYear();



const savedTheme =
  localStorage.getItem("theme");

function updateThemeButton() {
  const isLight = body.classList.contains("light");

  themeToggle.textContent =
    isLight ? "Dark mode" : "Light mode";

  themeToggle.setAttribute("aria-pressed", String(isLight));
}

if (savedTheme === "light") {

  body.classList.add("light");

}

updateThemeButton();


themeToggle.addEventListener(
  "click",
  () => {

    body.classList.toggle("light");

    const isLight =
      body.classList.contains("light");

    updateThemeButton();

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

  }
);


menuToggle.addEventListener(
  "click",
  () => {

    navLinks.classList.toggle("open");

    menuToggle.textContent =
      navLinks.classList.contains("open")
        ? "Close"
        : "Menu";

  }
);


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "Menu";

      }
    );

  });



const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    observer.observe(element);

  });



const terminalStatus =
  document.querySelector(
    ".terminal .green:last-child"
  );


if (terminalStatus) {

  const messages = [

    '"building..."',

    '"learning..."',

    '"experimenting..."'

  ];

  let index = 0;


  setInterval(() => {

    index =
      (index + 1) %
      messages.length;

    terminalStatus.textContent =
      messages[index];

  }, 2200);

}

if (yellowPopup) {

  const randomDelay =
    Math.floor(
      Math.random() * (50000 - 10000 + 1)
    ) + 10000;


  if (yellowClose) {
    yellowClose.addEventListener(
      "click",
      () => {

        yellowPopup.classList.remove("show");
        yellowPopup.setAttribute("aria-hidden", "true");

      }
    );
  }

  function showYellowRandomly() {
    const margin = 16;
    const popupWidth = yellowPopup.offsetWidth || 200;
    const popupHeight = yellowPopup.offsetHeight || 200;
    const x = margin + Math.random() * Math.max(0, window.innerWidth - popupWidth - margin * 2);
    const y = margin + Math.random() * Math.max(0, window.innerHeight - popupHeight - margin * 2);

    yellowPopup.style.left = `${x}px`;
    yellowPopup.style.top = `${y}px`;
    yellowPopup.style.right = "auto";
    yellowPopup.style.bottom = "auto";
    yellowPopup.classList.add("show");
    yellowPopup.setAttribute("aria-hidden", "false");

    setTimeout(showYellowRandomly, 10000 + Math.random() * 40000);
  }

  setTimeout(showYellowRandomly, randomDelay);

} 