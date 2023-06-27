export interface PizzaGroq {
  name: string;
  ingredients: {
    name: string;
    basePrice: number;
  }[];
  categories: {
    name: string;
    colourBg: string;
    colourFg: string;
  }[];
}

export interface Pizza {
  name: string;
  ingredients: string[];
  categories: {
    name: string;
    colourBg: string;
    colourFg: string;
  }[];
  prices: number[];
}

export interface PizzaData {
  pizzas: Pizza[];
  sizes: number[];
}

export interface PizzaBasketItem {
  id: number;
  pizza: Pizza;
  quantity: number;
  sizeIndex: number;
}
