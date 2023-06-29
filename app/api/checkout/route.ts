import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const items = await request.json();

  if (!items.length)
    return NextResponse.json({ error: "No items" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/order-complete`,
    cancel_url: `${origin}/order`,
    line_items: items.map((item: any) => ({
      price_data: {
        currency: "GBP",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
  });

  return NextResponse.json({ id: session.id });
}
