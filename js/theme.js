const themeBtn = document.querySelector("header button");
themeBtn.addEventListener("click", () => {
  const theme = localStorage.getItem("theme");
  changeTheme(theme === "light");
});

export function changeTheme(condition) {
  if (condition) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    document
      .querySelector("header button > img")
      .setAttribute("src", "../assets/images/icon-sun.svg");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    document
      .querySelector("header button > img")
      .setAttribute("src", "../assets/images/icon-moon.svg");
  }
}
