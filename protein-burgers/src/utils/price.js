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

export function getOptionsTotal(options = []) {
  return options.reduce((sum, option) => sum + (Number(option?.price) || 0), 0);
}

export function getCustomizedUnitPrice(basePrice, options = []) {
  return basePrice + getOptionsTotal(options);
}

export function getCustomizedLineTotal(basePrice, quantity, options = []) {
  return getCustomizedUnitPrice(basePrice, options) * quantity;
}

export function stableCustomizationKey(customizations = {}) {
  const normalized = Object.keys(customizations)
    .sort()
    .map((key) => {
      const value = customizations[key];
      if (Array.isArray(value)) return `${key}:${[...value].sort().join(',')}`;
      return `${key}:${value ?? ''}`;
    })
    .join('|');

  return normalized || 'plain';
}

export function cartLineKey(name, config = false) {
  if (typeof config === 'boolean') {
    return `${name}::${config ? 'cheese' : 'plain'}`;
  }

  return `${name}::${config?.variant ?? stableCustomizationKey(config?.customizations)}`;
}
