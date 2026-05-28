import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  EXTRA_CHEESE_PRICE,
  cartLineKey,
  formatPriceRupee,
  getCustomizedLineTotal,
  getCustomizedUnitPrice,
  getLineTotal,
  getUnitPrice,
  parsePriceRupee,
} from '../utils/price';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'proteinburger-cart-v2';

function safeStoredLines() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildLine(product, quantity, config = false) {
  const isLegacyCheese = typeof config === 'boolean';
  const extraCheese = isLegacyCheese
    ? config
    : Boolean(config?.extraCheese || config?.customizations?.addons?.includes('extra-cheese'));
  const selectedOptions = isLegacyCheese
    ? extraCheese
      ? [{ id: 'extra-cheese', name: 'Extra cheese', price: EXTRA_CHEESE_PRICE, groupLabel: 'Add-ons' }]
      : []
    : config?.selectedOptions ?? [];
  const basePrice = parsePriceRupee(product.price);
  const unitPrice = isLegacyCheese
    ? getUnitPrice(basePrice, extraCheese)
    : getCustomizedUnitPrice(basePrice, selectedOptions);

  return {
    key: cartLineKey(product.name, isLegacyCheese ? extraCheese : config),
    product,
    quantity,
    extraCheese,
    customizations: isLegacyCheese ? null : config?.customizations ?? null,
    selectedOptions,
    summary: isLegacyCheese
      ? extraCheese
        ? ['Extra cheese']
        : []
      : config?.summary ?? selectedOptions.map((option) => option.name),
    type: config?.type ?? (product.custom ? 'custom' : product.combo ? 'combo' : product.category ?? 'menu'),
    basePrice,
    unitPrice,
    lineTotal: isLegacyCheese
      ? getLineTotal(basePrice, quantity, extraCheese)
      : getCustomizedLineTotal(basePrice, quantity, selectedOptions),
  };
}

function updateLineQuantity(line, quantity) {
  return {
    ...line,
    quantity,
    lineTotal: line.unitPrice * quantity,
  };
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => safeStoredLines());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage can be blocked in private contexts; cart still works in memory.
    }
  }, [lines]);

  const addToCart = useCallback((product, quantity = 1, config = false) => {
    const qty = Math.max(1, quantity);
    const key = cartLineKey(product.name, config);

    setLines((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key
            ? updateLineQuantity(line, line.quantity + qty)
            : line,
        );
      }
      return [...prev, buildLine(product, qty, config)];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    setLines((prev) => {
      if (quantity < 1) {
        return prev.filter((line) => line.key !== key);
      }
      return prev.map((line) =>
        line.key === key ? updateLineQuantity(line, quantity) : line,
      );
    });
  }, []);

  const setExtraCheese = useCallback((key, extraCheese) => {
    setLines((prev) => {
      const line = prev.find((entry) => entry.key === key);
      if (!line) return prev;

      const without = prev.filter((entry) => entry.key !== key);
      const newKey = cartLineKey(line.product.name, extraCheese);
      const existing = without.find((entry) => entry.key === newKey);

      if (existing) {
        return without.map((entry) =>
          entry.key === newKey
            ? updateLineQuantity(entry, entry.quantity + line.quantity)
            : entry,
        );
      }

      return [...without, buildLine(line.product, line.quantity, extraCheese)];
    });
  }, []);

  const removeFromCart = useCallback((key) => {
    setLines((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const totals = useMemo(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const grandTotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    return { itemCount, grandTotal, grandTotalLabel: formatPriceRupee(grandTotal) };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addToCart,
      setQuantity,
      setExtraCheese,
      removeFromCart,
      clearCart,
      ...totals,
    }),
    [lines, isOpen, addToCart, setQuantity, setExtraCheese, removeFromCart, clearCart, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
