import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";

export async function POST(request: Request) {
  dbConnect();
  try {
    const { email } = await request.json();
    const orders = await OrderModel.find();

    return Response.json(orders);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
