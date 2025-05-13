import { loadCardsData } from "./cards/data.js";
import { cardsList, renderCards } from "./cards/render.js";
import { changeTheme } from "./theme.js";

load();

let cardsData;
let cardsDataCopy;

async function load() {
  cardsData = await loadCardsData();
  cardsData.forEach(renderCards);
  listenerToggleButtons();
  listenerFilterButtons();
  listenerRemoveButtons();

  const theme = localStorage.getItem("theme");

  const darkColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (theme) changeTheme(theme === "dark");
  else changeTheme(darkColorScheme);
}

function listenerRemoveButtons() {
  const removeBtnArray = document.querySelectorAll(".remove-btn");
  removeBtnArray.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      const currentCard = removeBtn.closest(".card");
      currentCard.remove();
      cardsData = cardsData.filter((card) => card.name !== currentCard.id);
    });
  });
}

function listenerFilterButtons() {
  const filterBtnArray = document.querySelectorAll(".filter-btn");
  filterBtnArray.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      document
        .querySelector(".active-filter-btn")
        .classList.remove("active-filter-btn");
      filterBtn.classList.add("active-filter-btn");

      const listState = filterBtn.textContent;

      cardsList.innerHTML = "";
      switch (listState) {
        case "Active":
          cardsDataCopy = cardsData.filter((card) => card.isActive);
          break;
        case "Inactive":
          cardsDataCopy = cardsData.filter((card) => !card.isActive);
          break;
        default:
          cardsDataCopy = cardsData;
          break;
      }

      cardsDataCopy.forEach(renderCards);
      listenerToggleButtons(listState);
      listenerRemoveButtons();
    });
  });
}

function listenerToggleButtons(state = "All") {
  const toggleBtnArray = document.querySelectorAll(".toggle-btn");
  toggleBtnArray.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
      cardsData = changeCardState(toggleBtn, cardsData, state);
    });
  });
}

function changeCardState(toggleBtn, cardsDataArray, state) {
  toggleBtn.classList.toggle("active-toggle-btn");
  const currentCard = toggleBtn.closest(".card");

  const result = (cardsDataArray = cardsDataArray.map((card) =>
    card.name === currentCard.id
      ? { ...card, isActive: !card.isActive }
      : { ...card }
  ));

  if (state === "Active" || state === "Inactive") {
    setTimeout(() => {
      currentCard.remove();
    }, 200);
  }

  return result;
}
