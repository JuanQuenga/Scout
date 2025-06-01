// Returns the input number floored to the nearest $5 increment
export function floorTo5(num: number) {
  return Math.floor(num / 5) * 5;
}

// Returns the 'Average Range' for a quote: 45% to 55% of the projection, floored to $5
// This is the typical range you might offer for most items
export function getAverageRange(projection: number) {
  return `$${floorTo5(projection * 0.45)} to $${floorTo5(projection * 0.55)}`;
}

// Returns the 'Premium Range' for a quote: 55% to 65% of the projection, floored to $5
// Use this for high-demand or premium items
export function getPremiumRange(projection: number) {
  return `$${floorTo5(projection * 0.55)} to $${floorTo5(projection * 0.65)}`;
}

// Returns the 'Niche/Oversized Range' for a quote: 30% to 40% of the projection, floored to $5
// Use this for niche, oversized, or harder-to-sell items
export function getNicheRange(projection: number) {
  return `$${floorTo5(projection * 0.3)} to $${floorTo5(projection * 0.4)}`;
}

// Returns the 'Checkout Range' for a quote: 40% to 60% of the projection, floored to $5
// Use this for items that are being checked out or need to move quickly
export function getCheckoutRange(projection: number) {
  return `$${floorTo5(projection * 0.4)} to $${floorTo5(projection * 0.6)}`;
}
