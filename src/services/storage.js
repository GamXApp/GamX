// Simulación de almacenamiento local para wishlist e historia
const WISHLIST_KEY = 'gamx_wishlist';
const HISTORY_KEY = 'gamx_history';

export function getWishlist() {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function addToWishlist(game, formData) {
  const wishlist = getWishlist();
  const exists = wishlist.find(item => item.id === game.id);
  if (exists) return false; // Ya está en wishlist
  wishlist.push({ ...game, ...formData, addedAt: new Date().toISOString() });
  saveWishlist(wishlist);
  return true;
}

export function removeFromWishlist(gameId) {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(item => item.id !== gameId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
}

export function isInWishlist(gameId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === gameId);
}

export function getHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addToHistory(game) {
  const history = getHistory();
  // Remover si ya existe
  const filtered = history.filter(item => item.id !== game.id);
  // Agregar al inicio
  filtered.unshift(game);
  // Limitar a 50
  if (filtered.length > 50) filtered.splice(50);
  saveHistory(filtered);
}