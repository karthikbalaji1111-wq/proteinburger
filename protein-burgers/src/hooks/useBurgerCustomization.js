import { useCallback, useMemo, useState } from 'react';
import { customizationGroups, defaultCustomization } from '../data/catalog';
import { getCustomizedUnitPrice, parsePriceRupee } from '../utils/price';

const emptyCustomization = {
  bread: '',
  cheese: [],
  sauces: [],
  patty: '',
  oil: '',
  addons: [],
};

function normalizeSelections(selections) {
  return {
    ...emptyCustomization,
    ...selections,
    cheese: selections?.cheese ?? [],
    sauces: selections?.sauces ?? [],
    addons: selections?.addons ?? [],
  };
}

function selectedOptionsFor(selections) {
  return customizationGroups.flatMap((group) => {
    const value = selections[group.id];
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    return group.options
      .filter((option) => ids.includes(option.id))
      .map((option) => ({ ...option, groupId: group.id, groupLabel: group.label }));
  });
}

export function useBurgerCustomization(product, initialSelections = emptyCustomization) {
  const [selections, setSelections] = useState(() => normalizeSelections(initialSelections));
  const [lastChanged, setLastChanged] = useState(null);

  const basePrice = useMemo(() => parsePriceRupee(product?.price), [product?.price]);
  const selectedOptions = useMemo(() => selectedOptionsFor(selections), [selections]);
  const addonTotal = useMemo(
    () => selectedOptions.reduce((sum, option) => sum + (Number(option.price) || 0), 0),
    [selectedOptions],
  );
  const unitPrice = useMemo(
    () => getCustomizedUnitPrice(basePrice, selectedOptions),
    [basePrice, selectedOptions],
  );
  const summary = useMemo(() => selectedOptions.map((option) => option.name), [selectedOptions]);

  const toggleOption = useCallback((group, optionId) => {
    setSelections((current) => {
      const currentValue = current[group.id];
      if (group.type === 'single') {
        return { ...current, [group.id]: currentValue === optionId ? '' : optionId };
      }

      const values = Array.isArray(currentValue) ? currentValue : [];
      const nextValues = values.includes(optionId)
        ? values.filter((value) => value !== optionId)
        : [...values, optionId];

      return { ...current, [group.id]: nextValues };
    });
    setLastChanged(optionId);
  }, []);

  const resetToDefault = useCallback(() => {
    setSelections(normalizeSelections(defaultCustomization));
    setLastChanged('reset');
  }, []);

  return {
    groups: customizationGroups,
    selections,
    selectedOptions,
    basePrice,
    addonTotal,
    unitPrice,
    summary,
    lastChanged,
    toggleOption,
    resetToDefault,
  };
}

export { emptyCustomization };
