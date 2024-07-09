import UserModel from "@/models/UserModel";
import dbConnect from "@/config/dbConnect";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const users = await UserModel.find();

    return Response.json(users);
  } catch (error) {
    console.log(error);
  }
}
