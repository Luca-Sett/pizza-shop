import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const items: {
    name: string;
    sizeIndex: number;
    quantity: number;
  }[] = await request.json();

  if (!items.length)
    return NextResponse.json({ error: "No items" }, { status: 400 });

  const origin = request.headers.get("origin");

  const names = items.map((item) => item.name);

  const [pizzasData, sizesData] = await Promise.all([
    client.fetch<{ name: string; ingredients: { basePrice: number }[] }[]>(
      groq`*[_type == "pizza" && name in ${JSON.stringify(
        names
      )} ]{name, ingredients[]->{basePrice}}`
    ),
    client.fetch<{ size: number; basePrice: number }[]>(
      groq`*[_type == "pizzaSize"]|order(basePrice){size, basePrice}`
    ),
  ]);

  const pizzasWithTotalBasePrice = pizzasData.map(({ name, ingredients }) => ({
    name,
    totalPriceOfIngredients:
      Math.round(
        ingredients.reduce(
          (total, ingredient) => total + ingredient.basePrice,
          0
        ) / 0.01
      ) * 0.01,
  }));

  const pizzasWithPrices = pizzasWithTotalBasePrice.map(
    ({ name, totalPriceOfIngredients }) => ({
      name,
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

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/order-complete`,
    cancel_url: `${origin}/order`,
    line_items: items.map((item) => ({
      price_data: {
        currency: "GBP",
        product_data: {
          name: `${sizesData[item.sizeIndex].size}" ${item.name}`,
        },
        unit_amount:
          pizzasWithPrices.find((pizza) => pizza.name === item.name)?.prices[
            item.sizeIndex
          ]! * 100,
      },
      quantity: item.quantity,
    })),
  });

  return NextResponse.json({ id: session.id });
}
