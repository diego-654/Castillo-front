export function parseDate(value: string | null): Date | null {
  if (value == null) return null; // Si es null o vacío, devolver null

  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day); // Crear la fecha con la zona horaria local
}
