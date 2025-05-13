import { changeTheme } from "./theme.js";

const cardsList = document.querySelector("#cards-list");

let cardsData;
let cardsDataCopy;

load();

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

async function loadCardsData() {
  const res = await fetch("../data.json");
  const data = await res.json();

  return data;
}

function renderCards(card) {
  const cardTemplate = document.querySelector("#card-template");
  const cardEl = cardTemplate.content.cloneNode(true).firstElementChild;

  fillContent(cardEl, card);
}

function fillContent(cardElement, cardData) {
  if (cardData.isActive)
    cardElement
      .querySelector(".actions .toggle-btn")
      .classList.add("active-toggle-btn");

  cardElement.id = cardData.name;
  cardElement.querySelector(".content .text h2").textContent = cardData.name;
  cardElement.querySelector(".content .text p").textContent =
    cardData.description;
  cardElement.querySelector(".content img").setAttribute("src", cardData.logo);
  cardsList.appendChild(cardElement);
}
