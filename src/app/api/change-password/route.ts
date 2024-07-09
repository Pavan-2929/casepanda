import UserModel from "@/models/UserModel";
import dbConnect from "@/config/dbConnect";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isLinkExpired = new Date(user.forgetPasswordExpiry) < new Date();

    if (isLinkExpired) {
      return Response.json(
        {
          success: false,
          message: "Link expired, please generate a new one.",
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Password reset successfully | Please Login again",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in resetting password", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
