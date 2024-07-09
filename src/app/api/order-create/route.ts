import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { user, product, paymentType, totalPrice } = await request.json();

    console.log(user, product, paymentType);

    const currentDate = new Date();
    const deliveryDate = new Date(
      currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
    );

    const newOrder = new OrderModel({
      user,
      product,
      paymentType,
      deliveryDate,
      totalPrice,
    });

    await newOrder.save();

    return Response.json(
      {
        success: true,
        message: "Order success",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
