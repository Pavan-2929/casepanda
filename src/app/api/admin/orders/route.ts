import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";

export async function GET(request: Request) {
  dbConnect();
  try {
    const orders = await OrderModel.find();

    return Response.json(
      {
        success: false,
        messsage: "order fetched successfully",
        orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while fetching orders",
      },
      {
        status: 500,
      }
    );
  }
}
