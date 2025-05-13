export const cardsList = document.querySelector("#cards-list");

export function renderCards(card) {
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
