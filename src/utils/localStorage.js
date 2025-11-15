
export function getJsonFromLocalStorage(key) {
  if (localStorage.getItem(key)) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error("Error parsing JSON from localStorage", e);
      return null;
    }
  }

  return null;
}
