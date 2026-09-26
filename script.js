const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem('theme');

function updateThemeButton() {
  const isLight = body.classList.contains('light');

  if (themeToggle) {
    themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode';
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
}

if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  body.classList.add('light');
}

updateThemeButton();

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  updateThemeButton();
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  menuToggle.textContent = navLinks?.classList.contains('open') ? 'Close' : 'Menu';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    if (menuToggle) {
      menuToggle.textContent = 'Menu';
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const yellowWindow = document.querySelector('.yellow-window');
if (yellowWindow) {
  const closeButton = yellowWindow.querySelector('.yellow-window-close');
  let nextTimer;
  let hideTimer;

  const scheduleWindow = () => {
    const delay = 20000 + Math.random() * 40000;w

    nextTimer = window.setTimeout(() => {
      const maxX = Math.max(12, window.innerWidth - yellowWindow.offsetWidth - 12);
      const maxY = Math.max(12, window.innerHeight - yellowWindow.offsetHeight - 12);

      yellowWindow.style.left = `${Math.floor(Math.random() * maxX)}px`;
      yellowWindow.style.top = `${Math.floor(Math.random() * maxY)}px`;
      yellowWindow.style.display = 'block';

      hideTimer = window.setTimeout(() => {
        yellowWindow.style.display = 'none';
        scheduleWindow();
      }, 8000);
    }, delay);
  };

  closeButton?.addEventListener('click', () => {
    window.clearTimeout(hideTimer);
    yellowWindow.style.display = 'none';
    scheduleWindow();
  });

  scheduleWindow();
}

const terminalStatus = document.querySelector('.duck-terminal .green:last-child');
if (terminalStatus) {
  const messages = ['"building..."', '"learning..."', '"experimenting..."'];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % messages.length;
    terminalStatus.textContent = messages[index];
  }, 2200);
}
