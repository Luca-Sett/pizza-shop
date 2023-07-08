export interface PizzaGroq {
  name: string;
  ingredients: {
    name: string;
    basePrice: number;
  }[];
  categories: Category[];
}

export interface Pizza {
  name: string;
  ingredients: string[];
  categories: Category[];
  prices: number[];
}

export interface PizzaData {
  pizzas: Pizza[];
  sizes: number[];
  categories: Category[];
}

export interface PizzaBasketItem {
  id: number;
  pizza: Pizza;
  quantity: number;
  sizeIndex: number;
}

export interface Category {
  name: string;
  colourBg: string;
  colourFg: string;
}
