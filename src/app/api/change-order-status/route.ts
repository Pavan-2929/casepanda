import dbConnect from "@/config/dbConnect";
import OrderModel from "@/models/OrderModel";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { orderId, orderStatus } = await request.json();
    const newOrder = await OrderModel.findById(orderId);
    

    if (!newOrder) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    newOrder.orderStatus = orderStatus;
    

    await newOrder.save();

    

    return Response.json(
      {
        success: true,
        message: "Order-status Changed",
        newOrder
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
