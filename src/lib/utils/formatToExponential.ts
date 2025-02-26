export function formatToExponential(value: number | string): string {
  if (typeof value === "number" && value >= 10_000) {
    return value.toExponential(2); // Notation exponentielle avec 2 décimales
  }
  return String(value); // Convertit en string pour uniformiser
}
