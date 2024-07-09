import OrderModel from "@/models/OrderModel";
import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/UserModel";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();

    const orders = await OrderModel.find({ "user.email": email });

    console.log(orders);

    return Response.json(orders);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
