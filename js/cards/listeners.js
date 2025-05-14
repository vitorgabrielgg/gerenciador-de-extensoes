import {
  getCardsData,
  getCardsDataCopy,
  setCardsData,
  setCardsDataCopy,
} from "./data.js";
import { cardsList, renderCards } from "./render.js";

export function listenerRemoveButtons() {
  const removeBtnArray = document.querySelectorAll(".remove-btn");
  removeBtnArray.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      const currentCard = removeBtn.closest(".card");
      currentCard.remove();
      setCardsData(
        getCardsData().filter((card) => card.name !== currentCard.id)
      );
    });
  });
}

export function listenerFilterButtons() {
  const filterBtnArray = document.querySelectorAll(".filter-btn");
  filterBtnArray.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      document
        .querySelector(".active-filter-btn")
        .classList.remove("active-filter-btn");
      filterBtn.classList.add("active-filter-btn");

      const listState = filterBtn.textContent;

      cardsList.innerHTML = "";

      let filtered;
      switch (listState) {
        case "Active":
          filtered = getCardsData().filter((card) => card.isActive);
          break;
        case "Inactive":
          filtered = getCardsData().filter((card) => !card.isActive);
          break;
        default:
          filtered = getCardsData();
          break;
      }

      setCardsDataCopy(filtered);
      getCardsDataCopy().forEach(renderCards);
      listenerToggleButtons(listState);
      listenerRemoveButtons();
    });
  });
}

export function listenerToggleButtons(state = "All") {
  const toggleBtnArray = document.querySelectorAll(".toggle-btn");
  toggleBtnArray.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
      const newData = changeCardState(toggleBtn, getCardsData(), state);

      setCardsData(newData);
    });
  });
}

export function changeCardState(toggleBtn, cardsDataArray, state) {
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
