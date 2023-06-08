export interface PizzaGridItemGroq {
  _id: string;
  name: string;
  categories: {
    _id: string;
    name: string;
    colourBg: string;
    colourFg: string;
  }[];
  prices: number[];
}

export interface PizzaGridItem {
  _id: string;
  name: string;
  categories: {
    _id: string;
    name: string;
    colourBg: string;
    colourFg: string;
  }[];
  price: number;
}

export default interface PizzaDetailsGroq {
  _id: string;
  name: string;
  categories: {
    colourBg: string;
    colourFg: string;
    _id: string;
    name: string;
  }[];
  ingredients: {
    _id: string;
    name: string;
    basePrice: number;
  }[];
}
