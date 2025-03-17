let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-toggle');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
}

if (darkmode === "active") {
  enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode');
  if (darkmode !== "active") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
