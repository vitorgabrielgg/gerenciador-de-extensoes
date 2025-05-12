const cardsList = document.querySelector("#cards-list");

load();

async function load() {
  let cardsData = await loadCardsData();
  cardsData.forEach(renderCards);

  const toggleBtnArray = document.querySelectorAll(".toggle-btn");
  toggleBtnArray.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
      cardsData = changeCardState(toggleBtn, cardsData);
    });
  });
}

function changeCardState(toggleBtn, cardsDataArray) {
  toggleBtn.classList.toggle("active-toggle-btn");
  const currentCardId = toggleBtn.closest(".card").id;

  return (cardsDataArray = cardsDataArray.map((card) =>
    card.name === currentCardId
      ? { ...card, isActive: !card.isActive }
      : { ...card }
  ));
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
