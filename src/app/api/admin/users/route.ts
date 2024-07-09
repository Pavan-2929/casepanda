import UserModel from "@/models/UserModel";
import dbConnect from "@/config/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {

    const {email} = await request.json()
    const users = await UserModel.find();

    return Response.json(users);
  } catch (error) {
    console.log(error);
  }
}
