import { loadCardsData, setCardsData, setCardsDataCopy } from "./cards/data.js";
import {
  listenerFilterButtons,
  listenerRemoveButtons,
  listenerToggleButtons,
} from "./cards/listeners.js";
import { renderCards } from "./cards/render.js";
import { changeTheme } from "./theme.js";

load();

async function load() {
  const data = await loadCardsData();
  setCardsData(data);
  data.forEach(renderCards);
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
