"use client";

import { PizzaBasketItem } from "@/lib/types";
import { createContext, useState } from "react";

export const BasketContext = createContext<{
  items: PizzaBasketItem[];
  justAdded: boolean;
  addItem: (item: PizzaBasketItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: PizzaBasketItem) => void;
}>({
  items: [],
  justAdded: false,
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PizzaBasketItem[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = (item: PizzaBasketItem) => {
    setItems([...items, item]);
    setJustAdded(true);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setJustAdded(false);
  };

  const updateItem = (index: number, newItem: PizzaBasketItem) => {
    setItems(items.map((item, i) => (i === index ? newItem : item)));
    setJustAdded(false);
  };

  return (
    <BasketContext.Provider
      value={{ items, justAdded, addItem, removeItem, updateItem }}
    >
      {children}
    </BasketContext.Provider>
  );
}
