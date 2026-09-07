const body = document.body;

const themeToggle =
  document.getElementById("theme-toggle");

const menuToggle =
  document.querySelector(".menu-toggle");

const navLinks =
  document.querySelector(".nav-links");

const year =
  document.getElementById("year");



year.textContent =
  new Date().getFullYear();



const savedTheme =
  localStorage.getItem("theme");


if (savedTheme === "light") {

  body.classList.add("light");

  themeToggle.textContent = "☀";

}


themeToggle.addEventListener(
  "click",
  () => {

    body.classList.toggle("light");

    const isLight =
      body.classList.contains("light");

    themeToggle.textContent =
      isLight ? "☀" : "☾";

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
        ? "×"
        : "☰";

  }
);


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

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

const yellowPopup =
  document.getElementById("yellow-popup");

const yellowClose =
  document.getElementById("yellow-close");


if (yellowPopup) {

  const randomDelay =
    Math.floor(
      Math.random() * (500000 - 100000 + 1)
    ) + 1000;


  setTimeout(() => {

    yellowPopup.classList.add("show");

  }, randomDelay);



  if (yellowClose) {
    yellowClose.addEventListener(
      "click",
      () => {

        yellowPopup.classList.remove("show");

      }
    );
  }

}
