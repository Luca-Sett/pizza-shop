import { PizzaGridItem, PizzaGridItemGroq } from "@/lib/types";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import PizzaGrid from "./PizzaGrid";

const fetchPizzas = async () => {
  const [pizzasFull, basePrice] = await Promise.all([
    client.fetch<PizzaGridItemGroq[]>(
      groq`*[_type == "pizza"]{_id, name, categories[]->{_id, name, colourBg, colourFg}, basePrice, "prices": ingredients[]->basePrice}`
    ),
    client.fetch<number>(
      groq`*[_type == "pizzaSize"]|order(basePrice)[0].basePrice`
    ),
  ]);

  const pizzas: PizzaGridItem[] = pizzasFull.map(({ prices, ...pizza }) => ({
    ...pizza,
    price:
      Math.round((basePrice + prices.reduce((a, b) => a + b, 0)) / 0.05) * 0.05,
    categories: pizza.categories ?? [],
  }));

  return pizzas;
};

export default async function PizzaGridWrapper() {
  const pizzas = await fetchPizzas();
  return <PizzaGrid pizzas={pizzas} />;
}
