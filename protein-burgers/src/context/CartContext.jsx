import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  cartLineKey,
  formatPriceRupee,
  getLineTotal,
  getUnitPrice,
  parsePriceRupee,
} from '../utils/price';

const CartContext = createContext(null);

function buildLine(product, quantity, extraCheese) {
  const basePrice = parsePriceRupee(product.price);
  return {
    key: cartLineKey(product.name, extraCheese),
    product,
    quantity,
    extraCheese,
    basePrice,
    unitPrice: getUnitPrice(basePrice, extraCheese),
    lineTotal: getLineTotal(basePrice, quantity, extraCheese),
  };
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product, quantity = 1, extraCheese = false) => {
    const qty = Math.max(1, quantity);
    const key = cartLineKey(product.name, extraCheese);

    setLines((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key
            ? buildLine(product, line.quantity + qty, extraCheese)
            : line,
        );
      }
      return [...prev, buildLine(product, qty, extraCheese)];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    setLines((prev) => {
      if (quantity < 1) {
        return prev.filter((line) => line.key !== key);
      }
      return prev.map((line) =>
        line.key === key ? buildLine(line.product, quantity, line.extraCheese) : line,
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
            ? buildLine(line.product, entry.quantity + line.quantity, extraCheese)
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
