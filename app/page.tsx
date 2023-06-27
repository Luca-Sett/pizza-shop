import { PizzaGroq } from "@/lib/types";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import Image from "next/image";
import BasketWrapper from "./BasketWrapper";
import PizzaGrid from "./PizzaGrid";
import { BasketProvider } from "./Provider";

const fetchPizzaData = async () => {
  const [pizzasData, sizesData] = await Promise.all([
    client.fetch<PizzaGroq[]>(
      groq`*[_type == "pizza"]{name, categories[]->{name, colourBg, colourFg}, ingredients[]->{name, basePrice}}`
    ),
    client.fetch<{ size: number; basePrice: number }[]>(
      groq`*[_type == "pizzaSize"]|order(basePrice){size, basePrice}`
    ),
  ]);

  const pizzasWithTotalBasePrice = pizzasData.map(
    ({ ingredients, categories, ...pizza }) => ({
      ...pizza,
      categories: categories ?? [],
      ingredients: ingredients.map((ingredient) => ingredient.name),
      totalPriceOfIngredients:
        Math.round(
          ingredients.reduce(
            (total, ingredient) => total + ingredient.basePrice,
            0
          ) / 0.01
        ) * 0.01,
    })
  );

  const pizzasWithPrices = pizzasWithTotalBasePrice.map(
    ({ totalPriceOfIngredients, ...pizza }) => ({
      ...pizza,
      prices: sizesData.map(
        (sizeData) =>
          +(
            Math.round(
              (sizeData.basePrice +
                totalPriceOfIngredients *
                  (sizeData.size ** 2 / sizesData[0].size ** 2)) /
                0.05
            ) * 0.05
          ).toFixed(2)
      ),
    })
  );

  const sizes = sizesData.map((sizeData) => sizeData.size);

  return { pizzas: pizzasWithPrices, sizes };
};

export default async function Home() {
  const pizzaData = await fetchPizzaData();

  return (
    <BasketProvider>
      <div className="flex flex-col md:pr-[360px]">
        <header className="bg-off-white grid place-items-center py-14 px-10">
          <Image
            src="title.svg"
            alt="Luca's Pizzeria Logo"
            width="406"
            height="114"
            priority
            className="w-full max-w-sm"
          />
        </header>

        <main className="bg-off-white px-10 pb-[96px] md:pb-[67px] grow">
          <PizzaGrid pizzaData={pizzaData} />
        </main>
      </div>

      <BasketWrapper sizes={pizzaData.sizes} />
    </BasketProvider>
  );
}
