export function saveToLocalStorage(key: string, value: any) {
  // Convert the object to a JSON string before storing
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  // Retrieve the JSON string and parse it back into an object
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null; // Return null if the key does not exist
}

export const formatTime = (isoString: string) => {
  const date = new Date(isoString);

  // Extract hours and minutes
  const hours = date.getUTCHours().toString().padStart(2, '0'); // UTC hour
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // UTC minute

  return `${hours}:${minutes}`;
};
