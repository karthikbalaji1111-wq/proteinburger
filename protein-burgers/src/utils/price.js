export const EXTRA_CHEESE_PRICE = 25;

export function parsePriceRupee(priceString) {
  if (!priceString) return 0;
  const digits = String(priceString).replace(/[^\d]/g, '');
  return Number(digits) || 0;
}

export function formatPriceRupee(amount) {
  return `₹${Math.round(amount)}`;
}

export function getUnitPrice(basePrice, extraCheese) {
  return basePrice + (extraCheese ? EXTRA_CHEESE_PRICE : 0);
}

export function getLineTotal(basePrice, quantity, extraCheese) {
  return getUnitPrice(basePrice, extraCheese) * quantity;
}

export function cartLineKey(name, extraCheese) {
  return `${name}::${extraCheese ? 'cheese' : 'plain'}`;
}
