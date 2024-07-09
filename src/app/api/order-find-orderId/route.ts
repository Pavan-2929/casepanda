import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();

    const order = await OrderModel.findById(id);

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Your order",
        order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
