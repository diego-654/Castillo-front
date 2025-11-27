/**
 * Parses a string to a number.
 *
 * @param value - The string to parse. If the value is `null` or an empty string, the function returns `null`.
 * @returns The parsed number, or `null` if the input is not a valid number.
 */
export function parseNumber(value: string | null): number | null {
  if (value == null || value.trim() === '') {
    return null;
  }

  const num = Number(value);
  return num;
}
