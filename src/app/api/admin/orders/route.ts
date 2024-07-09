import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";

export async function GET(request: Request) {
  dbConnect();
  try {
    const orders = await OrderModel.find();

    return Response.json(orders);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
