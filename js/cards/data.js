let cardsData = [];
let cardsDataCopy = [];

export function setCardsData(data) {
  cardsData = data;
}

export function getCardsData() {
  return cardsData;
}

export function setCardsDataCopy(data) {
  cardsDataCopy = data;
}

export function getCardsDataCopy() {
  return cardsDataCopy;
}

export async function loadCardsData() {
  const res = await fetch("data.json");
  const data = await res.json();

  return data;
}
