import { BASE_PRICE } from "@/lib/utils";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { user, product, id } = await request.json();

    const customer = await stripe.customers.create({
      name: user.username,
      email: user.email,
      address: {
        line1: user.address.street,
        city: user.address.city,
        state: user.address.state,
        postal_code: user.address.pincode,
        country: "INDIA",
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Your customized case",
            },
            unit_amount:
              (BASE_PRICE + product.material.price + product.finishes.price) *
              100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.HOST_URL}/order/${id}`,
      cancel_url: `${process.env.HOST_URL}/payment/failed`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    return new Response(JSON.stringify({ error: "Session creation failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
