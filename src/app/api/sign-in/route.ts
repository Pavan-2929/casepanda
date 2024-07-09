import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/UserModel";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User is not verified | Register your account",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { success: false, message: "Invalid Password" },
        { status: 401 }
      );
    }

    return Response.json(
      { success: true, message: "LoggedIn Successfull", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
