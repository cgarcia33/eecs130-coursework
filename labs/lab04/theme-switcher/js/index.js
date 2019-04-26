const defaultTheme = () => {
  document.querySelector(".container").classList.remove("ocean");
  document.querySelector(".container").classList.remove("desert");
};

const oceanTheme = () => {
  document.querySelector(".container").classList.remove("desert");
  document.querySelector(".container").classList.add("ocean");
};

const desertTheme = () => {
  document.querySelector(".container").classList.remove("ocean");
  document.querySelector(".container").classList.add("desert");
};

document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;
