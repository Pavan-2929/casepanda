import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/UserModel";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, verifyCode } = await request.json();

    const isUserExist = await UserModel.findOne({ email });

    if (!isUserExist) {
      return Response.json(
        { success: false, message: "Please register first" },
        { status: 401 }
      );
    }

    const isVerifyCodeValid = verifyCode === isUserExist.verifyCode;
    const isverifyCodeExpiry =
      new Date(isUserExist.verifyCodeExpiry) < new Date();

    if (isVerifyCodeValid && !isverifyCodeExpiry) {
      isUserExist.isVerified = true;
      await isUserExist.save();

      return Response.json(
        { success: true, message: "Verification successful" },
        { status: 200 }
      );
    } else if (!isVerifyCodeValid) {
      isUserExist.isVerified = false;
      await isUserExist.save();

      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 401 }
      );
    } else {
      isUserExist.isVerified = false;
      await isUserExist.save();

      return Response.json(
        { success: false, message: "Verification code expired" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in verifying email", error);
    return Response.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
