export const SECRET_EVENT = "mi-secret-found";
export const SECRET_KEY = "mi-universe-secrets";
export const SECRET_TOTAL = 8;

export function getSecrets() {
  try { return JSON.parse(localStorage.getItem(SECRET_KEY) || "[]"); } catch { return []; }
}
export function unlockSecret(id) {
  try {
    const current = getSecrets();
    if (!current.includes(id)) localStorage.setItem(SECRET_KEY, JSON.stringify([...current, id]));
    window.dispatchEvent(new CustomEvent(SECRET_EVENT, { detail: { id } }));
  } catch { window.dispatchEvent(new CustomEvent(SECRET_EVENT, { detail: { id } })); }
}
