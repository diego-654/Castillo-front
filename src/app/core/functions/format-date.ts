/**
 * Convierte un objeto `Date` en una cadena de fecha en formato `YYYY-MM-DD`.
 *
 * @param {Date | null} date - La fecha a formatear. Si es `null`, devuelve una cadena vacía.
 * @returns {string} La fecha en formato `YYYY-MM-DD` o una cadena vacía si la fecha es `null`.
 */
export function formatDateApi(date: Date | null): string {
  if (!date) return '';

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;    // YYYY-MM-DD en tu zona horaria
}
