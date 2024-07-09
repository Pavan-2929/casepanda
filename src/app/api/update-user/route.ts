import UserModel from "@/models/UserModel";
import dbConnect from "@/config/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { address, email } = await request.json();
    console.log(address);

    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { address } },
      { new: true }
    );
    return Response.json(
      {
        success: true,
        message: "Profile updated",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: true,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
