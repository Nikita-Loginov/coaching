import type { CurrencyType } from "../types";

export const getSymbolCurrency = (currency: CurrencyType) => {
  const currencies: Record<CurrencyType, string> = {
    rub: "₽",
    eu: "$",
  };

  return currencies[currency]
};
